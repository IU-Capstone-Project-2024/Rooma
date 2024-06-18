import QRCode from 'qrcode.react';


export default function Lobby(props) {
    return (
        <>
            <div style={{margin: 'auto auto auto auto', maxWidth: 'fit-content'}}>
                <a href={props.link} style={{fontSize: '5em'}}>PRESS ME</a>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <QRCode size={512} value={props.link}/>
            </div>
        </>
    );
};
