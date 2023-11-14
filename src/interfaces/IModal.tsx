
interface IShowModal {
    show?:boolean;
    modal?:string;
  }
interface IHandleModal extends IShowModal {
    id?: number
}

export type { IShowModal, IHandleModal }