import {outlineFromPriority} from "./utils/priorityColors";
import {parseFromNow} from "./utils/timeParser";
import {createSignal, For, onCleanup, Show} from "solid-js";
import IssueDetailNew from "./issueDetailNew";
import issues from "./stores/IssueStore";
import users from "./stores/userStore";

function Issue(props) {
    const priorityClass = outlineFromPriority(props.issue.priority) // <-- Get class name based on priority
    const [elapsed, setElapsed] = createSignal(parseFromNow(props.issue.timestamp)) // <-- Get elapsed time from now

    // Show new issue detail form
    const [showNew, setShowNew] = createSignal(false)
    const postNewDetail = (text) => {
        const newDetail = {
            issue_id: props.issue.id,
            note: text,
            operator: users.user()
        }
        issues.postDetail(newDetail).then(() => setShowNew(false))
    }

    // Close issue confirm dialog logic
    const [showConfirm, setShowConfirm] = createSignal(false)
    const toggleConfirm = () => setShowConfirm(!showConfirm())

    // Update elapsed time every 15 seconds
    let elapsedInterval = setInterval(() => setElapsed(parseFromNow(props.issue.timestamp)), 15000)
    onCleanup(() => clearInterval(elapsedInterval))

    return (
        <div class="lg:text-3xl">
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
                    <div class="flex transition-all duration-300"
                         classList={{"blur-sm": showConfirm()}}
                    >
                        <div class="flex-auto">{props.issue.operator}</div>
                        <div class="flex-auto text-right badge">{elapsed()}</div>
                    </div>
                    <div class="card-title flex">
                        <h2 class="flex-auto lg:text-3xl text-center">{props.issue.title}</h2>
                    </div>
                    <div class="stack">

                        {/*Close issue confirm dialog*/}
                        <Show when={showConfirm()}>
                            <div class="transition-all duration-300">
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
                        {/*Issue note*/}
                        <div classList={{"blur-sm": showConfirm()}}>
                            <p class="text-center lg:text-3xl">{props.issue.note}</p>
                        </div>
                    </div>
                </div>

                {/*Update note*/}
                <div class="divider transition-all duration-300 cursor-pointer"
                     classList={{"blur-sm": showConfirm()}}
                     onClick={() => setShowNew(true)}>Aggiornamenti
                </div>
                <Show when={showNew()}>
                    <IssueDetailNew postDetail={postNewDetail} abortInsert={() => setShowNew(false)}/>
                </Show>

                {/*Update loop*/}
                <Show when={'detail' in props.issue}
                      fallback={
                          <div onClick={() => setShowNew(true)}
                               class="text-center cursor-pointer" classList={{"blur-sm": showConfirm()}}>
                              Nessun aggiornamento
                          </div>
                      }>
                    <For each={props.issue.detail}>{detail =>
                        <div class="relative container mx-auto mt-4 mb-2 transition-all duration-300"
                             classList={{"blur-sm": showConfirm()}}>
                            <div class="absolute -left-4 -top-4 badge badge-info">{detail.operator}</div>
                            <div
                                class="absolute -right-4 -top-4 badge badge-accent">{parseFromNow(detail.timestamp)}</div>
                            <p class="text-center">{detail.note}</p>
                        </div>
                    }
                    </For>
                </Show>

            </div>
        </div>
    )
}

export default Issue;