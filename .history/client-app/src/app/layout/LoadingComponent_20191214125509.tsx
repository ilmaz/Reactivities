import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

export const LoadingComponent = () => {
    return (
        <Dimmer active>
            <Loader />
        </Dimmer>
    )
}
