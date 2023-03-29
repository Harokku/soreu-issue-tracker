import Skeleton from "./Skeleton";
import issues from "./stores/IssueStore";
import IssueList from "./IssueList";
import WebsocketHeartbeatJs from 'websocket-heartbeat-js';

let websocketHeartbeatJs = new WebsocketHeartbeatJs({
    url: `${import.meta.env.VITE_WS_BACKEND}/ws`,
    pingMsg: "ping",
    reconnectTimeout: 15000,
});
websocketHeartbeatJs.onopen = function () {
    console.log('connect success');
    websocketHeartbeatJs.send('hello server');
    if (issues.data.state !== "unresolved") {
        issues.refetch()
    }
}
websocketHeartbeatJs.onmessage = function (e) {
    if (e.data === 'close') websocketHeartbeatJs.close(); // close websocket

    // try to parse json
    try {
        const obj = JSON.parse(e.data);
        switch (obj?.operation) {
            case "Issue created":
                console.info(`received new ${obj?.id}:\t ${obj?.operation}`);
                issues.addIssue(obj.data);
                break
            case "Issue closed":
                console.info( `received new ${obj?.id}:\t ${obj?.operation}`);
                issues.closeIssue(obj.data.id);
                break
            default:
                console.info(`received unknown event`);
        }
        // if (obj?.id === "Issue Event") {
        //     console.log(`received new ${obj?.id}:\t ${obj?.operation}`);
        //     issues.addIssue(obj.data);
        // }
    } catch (e) {
    }
    console.info('received: ' + e.data);
}
websocketHeartbeatJs.onreconnect = function () {
    console.log('reconnecting...');
}
websocketHeartbeatJs.onclose = () => {
    console.log('connect close');
}


function App() {
    return (
        <div>
            <button onclick={() => issues.refetch()}>Refetch</button>
            <br/>
            <IssueList/>
            <hr/>
            <Skeleton/>
        </div>
    );
}

export default App;
