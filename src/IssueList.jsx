import {For} from "solid-js";
import Issue from "./Issue";
import issues from "./stores/IssueStore";

const IssueList = () => {

    const {data, doCloseIssue} = issues;

    return (
        <div>
            {data.error && <div>Error: {data.error.message}</div>}
            <div class="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 gap-6 m-4 py-4">
                {data() && data().data && (
                    <For each={data().data}>{issue =>
                        <Issue issue={issue} closeIssue={doCloseIssue}/>
                    }
                    </For>
                )}
            </div>
            {data.loading &&
                <div class="alert alert-info shadow-lg absolute bottom-0">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>Loading issues from server...</span>
                    </div>
                </div>
            }
        </div>
    );
}

export default IssueList;