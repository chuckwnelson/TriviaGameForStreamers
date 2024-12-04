import qrcode from 'qrcode-generator-es6'
import './style.css'

export interface JoinGameType {
  url?: string;
}
export default function JoinGameComponent({url = window.location.href}:JoinGameType) {


  return (
    <div className="join-game">
      <div className="header">@ChuckWNelson</div>
      <div className="body">
        <div className="qr-code"><QRCode url={url} /></div>
      </div>
      <div className="footer">Join the Game</div>
    </div>
  )
}

function QRCode({url}: {url:string}) {
  const qr = new qrcode(0, 'H');
  qr.addData(url);
  qr.make();

  const qrImg = qr.createSvgTag({})
  return (<div dangerouslySetInnerHTML={{ __html: qrImg }}></div>)
}
