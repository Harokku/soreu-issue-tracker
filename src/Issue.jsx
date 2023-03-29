import {outlineFromPriority} from "./utils/priorityColors";
import {parseFromNow} from "./utils/timeParser";
import {createSignal, onCleanup, Show} from "solid-js";

function Issue(props) {
    const priorityClass = outlineFromPriority(props.issue.priority) // <-- Get class name based on priority
    const [elapsed, setElapsed] = createSignal(parseFromNow(props.issue.timestamp)) // <-- Get elapsed time from now

    // Close issue confirm dialog logic
    const [showConfirm, setShowConfirm] = createSignal(false)
    const toggleConfirm = () => setShowConfirm(!showConfirm())

    // Update elapsed time every 15 seconds
    let elapsedInterval = setInterval(() => setElapsed(parseFromNow(props.issue.timestamp)), 15000)
    onCleanup(() => clearInterval(elapsedInterval))

    return (
        <div>
            <div
                class="card card-compact outline outline-4 outline-offset-4 glass"
                classList={{[priorityClass]: true}}
            >
                <div class="card-body">
                    <button
                        onclick={toggleConfirm}
                        class="btn btn-xs btn-circle absolute -top-2.5 -right-2.5">
                        X
                    </button>
                    <div class="flex"
                         classList={{"blur-sm": showConfirm()}}
                    >
                        <div class="flex-auto">{props.issue.operator}</div>
                        <div class="flex-auto text-right badge">{elapsed()}</div>
                    </div>
                    <div class="card-title flex">
                        <h2 class="flex-auto text-center">{props.issue.title}</h2>
                    </div>
                    <div class="stack">

                        <Show when={showConfirm()}>
                            <div>
                                <h1 class="text-xl font-semibold text-center">Chiudere la consegna?</h1>
                                <div class="card-actions justify-center">
                                    <button class="btn btn-success"
                                            onclick={() => {
                                                props.closeIssue(props.issue.id)
                                            }}
                                    >Si
                                    </button>
                                    <button class="btn btn-error"
                                            onclick={toggleConfirm}
                                    >No
                                    </button>
                                </div>
                            </div>
                        </Show>
                        <div classList={{"blur-sm": showConfirm()}}>
                            <p class="text-center">{props.issue.note}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Issue;