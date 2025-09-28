'use client';

export default function Ticket(props) {
    const claimClick = async () => {
        console.log("project: " + props.projectId)
        console.log("ticket: " + props.ticket._id.toString())
        try {
            const response = await fetch('/api/' + props.projectId + '/tickets/' + props.ticket._id.toString() + '/claim', {
                method: 'PUT',
                // TODO: unhardcode this
                body: JSON.stringify({
                    userEmail: "mach005.business@gmail.com",
                })
            });
            
            const data = await response.json();
            console.log('Success:', data);
            
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const completeClick = async () => {
        try {
            const response = await fetch('/api/' + props.projectId + '/tickets/' + props.ticket._id + '/complete', {
                method: 'PUT',
                // TODO: unhardcode this
                body: JSON.stringify({
                    userEmail: "mach005.business@gmail.com",
                })
            });
            
            const data = await response.json();
            console.log('Success:', data)
            
        } catch (error) {
            console.error('Error:', error);
        }
    }

    let state;
    let superButton;
    if (props.ticket.status == "Unclaimed") {
        state = <p style={{
            color: "#e0115f"
        }}>Unclaimed</p>
        superButton = <button 
            onClick={claimClick}
            style={{
                bottom: '20px',
                right: '20px',
                padding: '10px 15px',
                backgroundColor: '#007bff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
            }}
            >
            Claim
        </button>
    } else if (props.ticket.status == "Claimed") {
        state = <p style={{
            color: "#add8e6"
        }}>Claimed by {props.ticket.claimedby}</p>
        superButton = <button 
            onClick={completeClick}
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                padding: '10px 15px',
                backgroundColor: '#007bff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}
            >
            Complete
        </button>
    } else if (props.ticket.status == "Completed") {
        state = <p style={{
            color: "#93dc5c"
        }}>Completed by {props.ticket.completedby}</p>
        superButton = <p></p>
    }
    return (
        <div style={{
            backgroundColor: '#c1c7d7',
            borderStyle: 'solid',
            borderColor: '#000000',
            borderWidth: '3px',
            display: "flex",
            flexDirection: "column"
        }}>
            <h3>{props.ticket.title}</h3>
            {/* <h3>{props.ticket.description}</h3> */}
            <p><small>{props.ticket.email}</small></p>
            {/* {state} */}
            {/* {superButton} */}
        </div>
    );
}
