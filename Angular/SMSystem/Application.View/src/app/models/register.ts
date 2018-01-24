export class Register {
    constructor(
        public id?: number,
        public username?: string,
        public email?: string,
        public password?: string,
        public alterEgo?: string,
        public IsTerminated:boolean = false,
      ) {  }
}
