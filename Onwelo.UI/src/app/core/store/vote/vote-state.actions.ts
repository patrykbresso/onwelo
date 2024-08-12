export namespace VoteStateActions {
  export class GetVoters {
    static readonly type: string = '[Vote State] Get Voters';
  }

  export class GetCandidates {
    static readonly type: string = '[Vote State] Get Candidates';
  }

  export class AddVoter {
    static readonly type: string = '[Vote State] Add Voter';

    constructor(
      public payload: 
        { 
          fullname: string
        }
    ) {}
  }

  export class AddCandidate {
    static readonly type: string = '[Vote State] Add Candidate';

    constructor(
      public payload: 
        { 
          fullname: string
        }
    ) {}
  }

  export class PlaceVote {
    static readonly type: string = '[Vote State] Place Vote';

    constructor(
      public payload: 
        { 
          voterId: string,
          candidateId: string 
        }
    ) {}
  }
}
