/* Copyright Contributors to the Open Cluster Management project */
import { getArgoResourceStatuses } from './resourceStatusesArgo'
import { getSubscriptionResourceStatuses } from './resourceStatusesSubscription'
import { getAppSetResourceStatuses } from './resourceStatusesAppSet'
import { cloneDeep } from 'lodash'

export async function getResourceStatuses(application, appData, topology, lastRefresh) {
    let results
    const appDataWithStatuses = cloneDeep(appData)
    if (application.isArgoApp) {
        results = await getArgoResourceStatuses(application, appDataWithStatuses, topology)
    } else if (application.isAppSet) {
        results = await getAppSetResourceStatuses(application, appDataWithStatuses)
    } else {
        results = await getSubscriptionResourceStatuses(application, appDataWithStatuses, topology, lastRefresh)
    }
    const { resourceStatuses, relatedResources } = results
    return { resourceStatuses: cloneDeep(resourceStatuses), relatedResources, appDataWithStatuses }
}
