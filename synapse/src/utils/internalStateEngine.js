export function updateInternalState(
    state, tasks, habits
){
    const newState={
        ...state
    }

    const completed=
    tasks.filter(
        t=>t.completed
    ).length

    newState.stress+=
    completed*2

    newState.energy-=
    completed

    newState.focus+=
    habits.study*3

    newState.social+=1

    newState.energy=
    Math.max(
        0,
        Math.min(
            100,
            newState.energy
        )
    )

    return newState
}

