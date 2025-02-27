/* Copyright Contributors to the Open Cluster Management project */
import { Metadata } from './metadata'
import { IResource, IResourceDefinition } from './resource'

export const CertificateSigningRequestApiVersion = 'certificates.k8s.io/v1'
export type CertificateSigningRequestApiVersionType = 'certificates.k8s.io/v1'

export const CertificateSigningRequestKind = 'CertificateSigningRequest'
export type CertificateSigningRequestKindType = 'CertificateSigningRequest'

export const CertificateSigningRequestDefinition: IResourceDefinition = {
    apiVersion: CertificateSigningRequestApiVersion,
    kind: CertificateSigningRequestKind,
}

export interface CertificateSigningRequest extends IResource {
    apiVersion: CertificateSigningRequestApiVersionType
    kind: CertificateSigningRequestKindType
    metadata: Metadata
    status?: {
        certificate?: string
    }
}

export const CertificateSigningRequestListApiVersion = 'certificates.k8s.io/v1'
export type CertificateSigningRequestListApiVersionType = 'certificates.k8s.io/v1'

export const CertificateSigningRequestListKind = 'CertificateSigningRequestList'
export type CertificateSigningRequestListKindType = 'CertificateSigningRequestList'

export interface CertificateSigningRequestList extends IResource {
    apiVersion: CertificateSigningRequestListApiVersionType
    kind: CertificateSigningRequestListKindType
    items: CertificateSigningRequest[]
}

export const CSR_CLUSTER_LABEL = 'open-cluster-management.io/cluster-name'
