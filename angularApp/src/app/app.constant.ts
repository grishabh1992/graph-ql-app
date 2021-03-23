import { gql } from "apollo-angular";

export const AddNote = gql`
mutation addNote($title: String!) {
  addNote(name: $title) {
    name
    date
  }
}
`;

export const DeleteNote = gql`
mutation deleteNote($_id: String!) {
  deleteNote(_id: $_id) {
    message
  }
}
`;


