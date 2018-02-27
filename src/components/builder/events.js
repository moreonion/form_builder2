export const BUILDER_NODE_TRACED = 'NT'
export const BUILDER_BEFOREMOUNT = 'BBM'

export const BUILDER_REFS_REQ = 'RR'
export const BUILDER_REFS_REQD = 'RRD'

export class RequestRefsPayload {
  constructor(nodeRef) {
    this.node = nodeRef
  }
}

export class RefsRequestedPayload {
  constructor(nodeRef, refs) {
    this.node = nodeRef
    this.refs = refs
  }
}
