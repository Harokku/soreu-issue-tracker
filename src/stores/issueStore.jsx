import {createResource, createRoot} from "solid-js";

function createIssueStore() {

    // Fetch issues from backend
    const fetchIssues = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/issue`);
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

    // Add issue to backend
    const addIssue = (issue) => {
        let newIssue = data();  // <-- get actual data from getter
        newIssue["data"] = [...newIssue.data, issue]; // <-- add new issue to data array
        mutate({...newIssue}); // <-- mutate data optimistically
        //postIssue(issue)
        refetch() // <-- refetch data from backend
    }

    // Close issue to backend
    const closeIssue = (id) => {
        console.log(`Removing issue ${id}`)
        // remove item with id=id from data array
        let newIssue = data(); // <-- get actual data from getter
        newIssue["data"] = newIssue.data.filter((item) => item.id !== id);
        mutate({...newIssue}); // <-- mutate data optimistically
        // doCloseIssue(id)
        //     .then((res) => {
        //         console.info("Issue closed")
        //     }).catch((err) => {
        //     refetch() // <-- refetch data from backend in case of failure
        // })
    }

    return {data, addIssue, closeIssue, doCloseIssue, refetch};
}

export default createRoot(createIssueStore);