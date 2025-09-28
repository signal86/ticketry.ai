import Image from "next/image";
import styles from "./page.module.css";
import { auth0 } from "@/lib/auth0";
import { redirect } from 'next/navigation'
import Ticket from "./ticket.js";
import { Roboto } from "next/font/google";

export default async function Home() {
  const session = await auth0.getSession();
  if (!session) {
    redirect("/login")
  }
  const baseUrl = process.env.APP_BASE_URL
  let res = await fetch(baseUrl + "/api/demo/doesProjectExist/" + session.user.email)
  if (res.status != 200) {
    res = await fetch(baseUrl + "/api/demo/createProject/" + session.user.email, {
      method: 'POST',
      body: JSON.stringify({ name: session.user.name })
    })
  }
  // console.log(res)
  res = await res.json()
  // res = await fetch(baseUrl + "/api/demo/doesProjectExist/" + session.user.email)
  //   console.log(res)
  // if (res.status != 200) {
  //   throw new Error("its so over")
  // }
  // res = await res.json()
  // res.project is the project

  // console.log(res)
  const project = res.project
  // project contains:
  /*
  _id (type ObjectId)
  name (project name)
  owner (email of owner)
  members (aray of members)
  createdAt
  */
  // console.log(project);
  const resTickets = await fetch(baseUrl + "/api/demo/getTickets/" + project._id.toString())
  let tickets = await resTickets.json();
  // tickets = tickets.tickets
  // tickets contain:
  /*
  an array of:
  title
  email
  description
  additionaldetails
  status
  createdAt
  */
  tickets = tickets.tickets
  // console.log(tickets);
  const ticketElementArray = []
  for (let i=0; i < tickets.length; i++) {
    ticketElementArray.push(<Ticket key={i} projectId={project._id.toString()} ticket={tickets[i]}/>)
  }
  
  const teamMembersRaw = await fetch(baseUrl + "/api/" + project._id.toString() + "/getMembers")
  let teamMembers = await teamMembersRaw.json()
  // console.log("team members: " + teamMembers.members)

  const memberArray = [];
  for (let i=0; i < teamMembers.members.length; i++) {
    memberArray.push(<p key={i}>{teamMembers.members[i]}</p>)
  }

  return (
    <div className={styles["main-background"]} style={{   
      display: 'flex',
      height: '100vh',
      margin: 0,
      padding: 0
      
    }}>
      <div className={styles["slide-in-left"]} style={{
        flex: 1,
        background: '#9c9c9c',
        boxShadow: '0 16px 32px rgba(0, 0, 0, 0.3)',
        zIndex: 1,
        backgroundColor: '#9c9c9c',
        display: 'flex',
        margin: 0,
        color: 'white',
        fontSize: '24px',
        flexDirection: "column",
        alignItems: "flex-start",
        justifyItems: "flex-start",
        borderColor: "#000000",
        borderWidth: "3px",
        borderStyle: "solid"
      }}>

        <div style={{
          margin: 0,
          height: '80px',
          width: '100%',
          borderColor: "#000000",
          borderWidth: "3px",
          borderStyle: "solid",
          borderLeft: '0px',
          borderRight: '0px',
          display: 'flex',
          flexDirection: "row"
        }}>
          <a style={{width: '95%', textAlign: 'center'}}href='/auth/logout'>
          <button style={{
            borderWidth: '3px',
            borderColor: '#000000',
            borderStyle: 'solid',
            background: '#208cf8',
            height: "60px",
            width: '100%',
            margin: '5px',
            textAlign: "center",
            borderRadius: '50px',
            fontSize: '2rem'
            }}>
            {session.user.name} - Logout
          </button>
          </a>
        </div>

        <div style={{
          margin: 0,
          height: '100%',
          width: '100%',
          borderColor: "#000000",
          borderWidth: "3px",
          borderStyle: "solid",
          borderLeft: '0px',
          borderRight: '0px',
          fontFamily: 'Roboto'
        }}>
          <h3 style={{fontFamily: 'Roboto'}}>
            Team Members
          </h3>
          {memberArray}
          </div>

          <div style={{
            margin: 0,
            height: '80px',
            width: '100%',
            display: 'flex',
            flexDirection: "row"
          }}>
            <button style={{
              height: '70px',
              width: '70px',
              fontSize: '200%',
              margin: '3px',
              borderRadius: '50px',
              borderColor: '#000000',
              borderStyle: 'solid',
              borderWidth: '5px'
            }}>
              +
            </button>
            <h2 style={{
              margin: '15px'
            }}>
              Invite
            </h2>

        </div>
        
      </div>
      <div style={{
        flex: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '24px'
      }}>
      {ticketElementArray}
      </div>

      <div style={{
        flex: 1,
        // backgroundColor: '#000000',
        // display: 'flex',
        // margin: 0,
        // alignItems: 'center',
        // justifyContent: 'center',
        // color: 'white',
        // fontSize: '24px',  
        // borderColor: "#000000",
        // borderWidth: "3px",
        // borderStyle: "solid"
      }}>
        
      </div>
    </div>
  );
}

