import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  position: number;
  name: string;
  album: number;
  dateAdd: string;
  time: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1,  name: 'Hydrogen', album: 1, dateAdd: 'H', time: 10, },
  {position: 1,  name: 'Hydrogen', album: 1, dateAdd: 'H', time: 10, },
  {position: 1,  name: 'Hydrogen', album: 1, dateAdd: 'H', time: 10, },
  {position: 1,  name: 'Hydrogen', album: 1, dateAdd: 'H', time: 10, },
  {position: 1,  name: 'Hydrogen', album: 1, dateAdd: 'H', time: 10, },
  {position: 1,  name: 'Hydrogen', album: 1, dateAdd: 'H', time: 10, },
  {position: 1,  name: 'Hydrogen', album: 1, dateAdd: 'H', time: 10, },
  {position: 1,  name: 'Hydrogen', album: 1, dateAdd: 'H', time: 10, },
  // {position: 2,  name: 'Helium', album: 4, dateAdd: 'He', time: 10},
  // {position: 3, name: 'Lithium', album: 6.941, dateAdd: 'Li', time: 10},
  // {position: 4, name: 'Beryllium', album: 9.0122, dateAdd: 'Be', time: 10},
  // {position: 5, name: 'Boron', album: 10.811, dateAdd: 'B', time: 10},
  // {position: 6, name: 'Carbon', album: 12.0107, dateAdd: 'C', time: 10},
  // {position: 7, name: 'Nitrogen', album: 14.0067, dateAdd: 'N', time: 10},
  // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-body-library',
  templateUrl: './body-library.component.html',
  styleUrls: ['./body-library.component.scss']
})
export class BodyLibraryComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'album', 'dateAdd', 'time', 'favorite'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
