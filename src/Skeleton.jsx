const Skeleton = () => {
    return (
        <>
            <div class="grid grid-cols-4 gap-6 m-4 py-4">

                {/*issue cards*/}
                <div>
                    <div class=" card card-compact outline outline-success outline-4 outline-offset-4 glass">
                        <div class="card-body">
                            <button class="btn btn-xs btn-circle absolute -top-2.5 -right-2.5">
                                X
                            </button>
                            <div class="flex">
                                <div class="flex-auto">s.crenna</div>
                                <div class="flex-auto text-right badge">15 min fa</div>
                            </div>
                            <div class="card-title flex">
                                <h2 class="flex-auto text-center">Busto pieno</h2>
                            </div>
                            <p class="text-center">Non ricettivo per traumi?</p>
                        </div>

                        <div class="divider">Aggiornamenti</div>

                        {/*Update loop*/}
                        <div class="relative mx-auto mt-4 mb-2">
                            <div class="absolute -left-20 -top-4 badge badge-accent">30 sec fa</div>
                            <p>Update</p>
                            <p>2nd line</p>
                        </div>
                        <div class="relative mx-auto mt-4">
                            <div class="absolute -left-20 -top-4 badge badge-accent">30 sec fa</div>
                            Update
                        </div>
                    </div>

                </div>

                <div>
                    <div class=" card card-compact outline outline-warning outline-4 outline-offset-4 glass">
                        <div class="card-body">
                            <div class="flex blur-sm">
                                <div class="flex-auto">s.crenna</div>
                                <div class="flex-auto text-right badge">30 sec fa</div>
                            </div>
                            <div class="card-title flex">
                                <h2 class="flex-auto text-center">Busto pieno</h2>
                            </div>
                            <div class="stack">
                                <div class="blur-sm">
                                    <p class="text-center">Non ricettivo per traumi?</p>
                                    <p class="text-center">Non ricettivo per traumi?</p>
                                    <p class="text-center">Non ricettivo per traumi?</p>
                                </div>
                                <div>
                                    <h1 class="text-xl font-semibold text-center">Chiudere la consegna?</h1>
                                    <div class="card-actions justify-center">
                                        <button class="btn btn-success">Si</button>
                                        <button class="btn btn-error">No</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="card card-compact outline outline-4 outline-error outline-offset-4 glass">
                        <div class="card-body">
                            <h2 class="card-title">Life hack</h2>
                            <p>How to park your car at your garage?</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="card card-compact outline outline-4 outline-info outline-offset-4 glass">
                        <div class="card-body">
                            <h2 class="card-title">Life hack</h2>
                            <p>How to park your car at your garage?</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Skeleton