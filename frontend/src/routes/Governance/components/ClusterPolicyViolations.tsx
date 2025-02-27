/* Copyright Contributors to the Open Cluster Management project */

import { StatusIcons } from '../../../components/StatusIcons'
import { IPolicyRisks } from '../useGovernanceData'

export function ClusterPolicyViolationIcons(props: {
    risks: IPolicyRisks
    compliantHref?: string
    violationHref?: string
    unknownHref?: string
}) {
    const { risks, compliantHref, violationHref, unknownHref } = props
    const violations = risks.high + risks.medium + risks.low
    return (
        <StatusIcons
            compliant={risks.synced}
            compliantTooltip={
                risks.synced == 1
                    ? '1 cluster without violations'
                    : '{0} clusters without violations'.replace('{0}', risks.synced.toString())
            }
            compliantHref={compliantHref}
            violations={violations}
            violationsTooltip={
                violations == 1
                    ? '1 cluster with violations'
                    : '{0} clusters with violations'.replace('{0}', violations.toString())
            }
            violationHref={violationHref}
            unknown={risks.unknown}
            unknownTooltip={
                risks.unknown == 1
                    ? '1 cluster with unknown status'
                    : '{0} clusters with unknown status'.replace('{0}', risks.unknown.toString())
            }
            unknownHref={unknownHref}
        />
    )
}

export function ClusterPolicyViolationIcons2(props: {
    compliant: number
    noncompliant: number
    compliantHref?: string
    violationHref?: string
}) {
    return (
        <StatusIcons
            compliant={props.compliant}
            compliantTooltip={
                props.compliant == 1
                    ? '1 cluster without violations'
                    : '{0} clusters without violations'.replace('{0}', props.compliant.toString())
            }
            compliantHref={props.compliantHref}
            violations={props.noncompliant}
            violationsTooltip={
                props.noncompliant == 1
                    ? '1 cluster with violations'
                    : '{0} clusters with violations'.replace('{0}', props.noncompliant.toString())
            }
            violationHref={props.violationHref}
        />
    )
}
