/* Copyright Contributors to the Open Cluster Management project */

import { makeStyles } from '@material-ui/styles'
import { Text, TextContent, TextVariants } from '@patternfly/react-core'
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon } from '@patternfly/react-icons'
import { TableGridBreakpoint } from '@patternfly/react-table'
import { AcmTable, compareStrings } from '@stolostron/ui-components'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { usePolicies } from '../../../atoms'
import { useTranslation } from '../../../lib/acm-i18next'
import { NavigationPath } from '../../../NavigationPath'
import { Cluster } from '../../../resources'
import { ClusterPolicies, getPolicyForCluster } from '../common/util'

const useStyles = makeStyles({
    body: {
        position: 'relative',
        top: '-35px',
        padding: '0 8px',
        '& section': {
            paddingTop: 'var(--pf-global--spacer--lg)',
        },
    },
    titleText: {
        paddingBottom: 'var(--pf-global--spacer--xl)',
        '& h4': {
            color: 'var(--pf-global--Color--200)',
        },
    },
    sectionSeparator: {
        borderBottom: '1px solid #D2D2D2',
        margin: '0 -2rem 1rem -2rem',
    },
    toggleContainer: {
        position: 'relative',
        zIndex: 1,
        top: '16px',
        width: 'fit-content',
        height: 0,
        marginLeft: 'auto',
    },
    tableTitle: {
        paddingBottom: 'var(--pf-global--spacer--md)',
    },
    backAction: {
        paddingBottom: 'var(--pf-global--spacer--lg)',
    },
    subDetailComponents: {
        paddingBottom: 'var(--pf-global--spacer--xl)',
        '& small': {
            color: 'inherit',
            paddingBottom: 'var(--pf-global--spacer--sm)',
        },
    },
    riskSubDetail: {
        paddingLeft: 'var(--pf-global--spacer--lg)',
        '& p': {
            fontSize: 'var(--pf-global--FontSize--xs)',
            color: '#5A6872',
        },
    },
})

export function PolicySummarySidebar(props: { cluster: Cluster; compliance: string }) {
    const { cluster, compliance } = props
    const classes = useStyles()
    const { t } = useTranslation()
    const policies = usePolicies()

    const clusterPolicies = useMemo(() => getPolicyForCluster(cluster, policies), [cluster, policies])

    const policyColumnDefs = useMemo(
        () => [
            {
                header: t('Policy name'),
                search: 'policyName',
                sort: (a: ClusterPolicies, b: ClusterPolicies) =>
                    /* istanbul ignore next */
                    compareStrings(a.policyName, b.policyName),
                cell: (policy: ClusterPolicies) => {
                    return (
                        <Link
                            to={{
                                pathname: NavigationPath.policyDetailsResults
                                    .replace(':namespace', policy.policyNamespace)
                                    .replace(':name', policy.policyName),
                            }}
                        >
                            {policy.policyName}
                        </Link>
                    )
                },
            },
            {
                header: t('Cluster violation'),
                sort: (a: ClusterPolicies, b: ClusterPolicies) => compareStrings(a.compliance, b.compliance),
                cell: (policy: ClusterPolicies) => {
                    switch (policy.compliance.toLowerCase()) {
                        case 'compliant':
                            return (
                                <div>
                                    <CheckCircleIcon color="var(--pf-global--success-color--100)" />
                                </div>
                            )
                        case 'noncompliant':
                            return (
                                <div>
                                    <ExclamationCircleIcon color="var(--pf-global--danger-color--100)" />
                                </div>
                            )
                        default:
                            return (
                                <div>
                                    <ExclamationTriangleIcon color="var(--pf-global--warning-color--100)" />
                                </div>
                            )
                    }
                },
            },
        ],
        [t]
    )

    return (
        <div className={classes.body}>
            <TextContent className={classes.titleText}>
                <Text component={TextVariants.h2}>{cluster.name}</Text>
            </TextContent>
            <div className={classes.sectionSeparator} />
            <AcmTable<ClusterPolicies>
                plural="Policies"
                items={clusterPolicies}
                initialSort={{
                    index: 1, // default to sorting by violation count
                    direction: compliance === 'compliant' ? 'asc' : 'desc',
                }}
                columns={policyColumnDefs}
                keyFn={(item: ClusterPolicies) => item.policyName!}
                tableActions={[]}
                rowActions={[]}
                gridBreakPoint={TableGridBreakpoint.none}
                autoHidePagination={true}
                searchPlaceholder={t('Find by name')}
            />
        </div>
    )
}
