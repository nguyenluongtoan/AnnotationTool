import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor() {}

  ngOnInit() {}
  title = 'app';

  columnDefs = [{
      headerName: 'Make',
      field: 'make'
    },
    {
      headerName: 'Model',
      field: 'model'
    },
    {
      headerName: 'Price',
      field: 'price'
    }
  ];

  rowData = [{
      make: 'Toyota',
      model: 'Celica',
      price: 35000
    },
    {
      make: 'Ford',
      model: 'Mondeo',
      price: 32000
    },
    {
      make: 'Porsche',
      model: 'Boxter',
      price: 72000
    }
  ];

}
