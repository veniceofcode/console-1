/* Copyright Contributors to the Open Cluster Management project */
import { isHrefNavItem, useResolvedExtensions } from '@openshift-console/dynamic-plugin-sdk'
import { ReactNode, useCallback, useMemo } from 'react'
import { PluginContext } from '../lib/PluginContext'

export function PluginContextProvider(props: { children?: ReactNode }) {
    const [hrefs] = useResolvedExtensions(isHrefNavItem)
    const hrefAvailable = useCallback(
        (id: string) =>
            hrefs.findIndex((e) => {
                return e.properties.perspective === 'acm' && e.properties.id === id
            }) >= 0,
        [hrefs]
    )

    const isOverviewAvailable = useMemo(() => hrefAvailable('acm-overview'), [hrefAvailable])
    const isApplicationsAvailable = useMemo(() => hrefAvailable('acm-applications'), [hrefAvailable])
    const isGovernanceAvailable = useMemo(() => hrefAvailable('acm-governance'), [hrefAvailable])
    const isSearchAvailable = useMemo(() => hrefAvailable('acm-search'), [hrefAvailable])
    const isACMAvailable = isOverviewAvailable
    const isSubmarinerAvailable = isOverviewAvailable

    return (
        <PluginContext.Provider
            value={{
                isACMAvailable,
                isOverviewAvailable,
                isApplicationsAvailable,
                isGovernanceAvailable,
                isSearchAvailable,
                isSubmarinerAvailable,
            }}
        >
            {props.children}
        </PluginContext.Provider>
    )
}
