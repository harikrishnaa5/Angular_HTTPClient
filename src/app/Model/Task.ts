export class Task {
  constructor(
    public title: string,
    public desc: string,
    public createdAt: string,
    public assignedTo: string,
    public priority: string,
    public status: string
  ) {
    
  }
}
