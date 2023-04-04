import {createResource, createRoot} from "solid-js";

function createIssueStore() {

    // Fetch issues from backend
    const fetchIssues = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/issue?mode=full`);
        return response.json()
    }

    // Post data to backend
    const postIssue = async (issue) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/issue`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(issue)
        });
        return await response.json()
    }

    // Close issue to backend
    const doCloseIssue = async (id) => {
        // put fetch request to backend
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/issue/close/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
        });
        return await response.json()
    }

    const [data, {mutate, refetch}] = createResource(fetchIssues); // <-- createResource

    // Add issue to frontend
    const addIssue = (issue) => {
        let newIssue = data();  // <-- get actual data from getter
        // if data is not yet loaded, create empty array
        if (!newIssue.data) {
            newIssue["data"] = [];
        }
        newIssue["data"] = [...newIssue.data, issue]; // <-- add new issue to data array
        mutate({...newIssue}); // <-- mutate data optimistically
        //postIssue(issue)
        refetch() // <-- refetch data from backend
    }

    // Add detail to frontend
    const addDetail = (detail) => {
        let issue = data(); // <-- get actual data from getter
        // search for issue with id=detail.issue_id
        let issueIndex = issue.data.findIndex((item) => item.id === detail.issue_id);
        // if issue have no detail, create empty array
        if (!issue.data[issueIndex].detail) {
            issue.data[issueIndex].detail = []
        }
        // if issue is found, add detail to issue
        if (issueIndex !== -1) {
            issue.data[issueIndex].detail = [...issue.data[issueIndex].detail, detail];
            mutate({...issue}); // <-- mutate data optimistically
        }
        refetch()
    }

    // Post new detail to backend
    const postDetail = async (detail) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/issue/detail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(detail)
        });
        return await response.json()
    }

    // Close issue to backend
    const closeIssue = (id) => {
        console.log(`Removing issue ${id}`)
        // remove item with id=id from data array
        let newIssue = data(); // <-- get actual data from getter
        newIssue["data"] = newIssue.data.filter((item) => item.id !== id);
        mutate({...newIssue}); // <-- mutate data optimistically
    }

    return {data, addIssue, addDetail, postDetail, closeIssue, doCloseIssue, refetch};
}

export default createRoot(createIssueStore);