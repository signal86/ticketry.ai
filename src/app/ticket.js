export default function template(props) {
    let state
    if (props.ticket.status == "Unclaimed") {
        state = <p>Unclaimed</p>
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
        </div>
    );
}