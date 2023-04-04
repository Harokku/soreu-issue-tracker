import {Show, createSignal} from "solid-js";
import users from "./stores/userStore";

function IssueDetailNew(props) {
    const {loggedIn, login, checkLogin} = users
    const [newUser, setNewUser] = createSignal("")
    const [update, setUpdate] = createSignal("")

    checkLogin()

    return (
        <Show when={loggedIn()} fallback={
            <div class="my-2">
                <input type="text" placeholder="Inserisci utente"
                       value={newUser()}
                       class="input input-bordered input-primary w-full max-w-xs"
                       onInput={(e) => setNewUser(e.target.value)}
                />
                <button onclick={() => login(newUser())} class="flex mx-auto btn btn-success">Registra utente</button>
            </div>
        }>
            <div class="my-2">
                <textarea type="text" placeholder="Testo aggiornamento"
                       value={update()}
                       class="textarea textarea-bordered  w-full max-w-xs"
                       onInput={(e) => setUpdate(e.target.value)}
                />
                <div class="flex justify-between">
                    <button class="btn btn-success"
                            onclick={() => {
                                props.postDetail(update())
                            }}
                    >Salva
                    </button>
                    <button class="btn btn-error"
                            onclick={() => {
                                props.abortInsert()
                            }}
                    >Annulla
                    </button>
                </div>
            </div>
        </Show>
    )
}

export default IssueDetailNew