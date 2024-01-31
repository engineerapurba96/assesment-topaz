import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>('assets/data.json').pipe(
      map((response:any)=>{
        const res = response.requests;
        response.support_rep = [];
        response.openCount = res.filter((data:any) => (data.status).toLowerCase() === 'open').length;
        response.closeCount = res.filter((data:any) => (data.status ).toLowerCase() === 'closed').length;
        let support_rep_one = res.filter((data:any) => data.supportRep === 'Support Rep 1' && data.status === 'Open').length;
        let support_rep_two = res.filter((data:any) => data.supportRep === 'Support Rep 2' && data.status === 'Open').length;
        let support_rep_three = res.filter((data:any) => data.supportRep === 'Support Rep 3' && data.status === 'Open').length;
        let support_rep_four = res.filter((data:any) => data.supportRep === 'Support Rep 4' && data.status === 'Open').length;
        response.team_a = res.filter((data:any) => data.team === 'Team A').length;
        response.team_b = res.filter((data:any) => data.team === 'Team B').length;
        response.high_priority = res.filter((data:any) => data.priority === 'High').length;
        response.changeRq = res.filter((data:any) => data.type === 'Change Request').length;
        response.unassigned = res.filter((data:any) => data.supportRep === null).length;
        response.support_rep.push(
          {name:"Support Rep 1", count: support_rep_one},
          {name:"Support Rep 2", count: support_rep_two},
          {name:"Support Rep 3", count: support_rep_three},
          {name:"Support Rep 4", count: support_rep_four});
          response.support_rep.sort((a: { count: number }, b: { count: number }) => b.count - a.count);

        

        return response
      })
    )
  }
}
