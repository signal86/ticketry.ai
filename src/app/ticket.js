export default function Ticket(props) {
    let state
    if (props.ticket.status == "Unclaimed") {
        state = <p style={{
            color: "#e0115f"
        }}>Unclaimed</p>
    } else if (props.ticket.status == "Claimed") {
        state = <p style={{
            color: "#add8e6"
        }}>Claimed by {props.ticket.claimedby}</p>
    } else if (props.ticket.status == "Completed") {
        state = <p style={{
            color: "#93dc5c"
        }}>Completed by {props.ticket.completedby}</p>
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
            <title>{props.ticket.name}</title>
            <h3>{props.ticket.description}</h3>
            <p><small>{props.ticket.email}</small></p>
            {state}
        </div>
    );
}
