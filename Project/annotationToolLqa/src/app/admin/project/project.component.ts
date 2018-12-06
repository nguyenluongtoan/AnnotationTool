import {
  Component,
  OnInit
} from '@angular/core';
import { ChildMessageRenderer } from "./child-message-renderer.component";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor() {}

  ngOnInit() {}
  title = 'app';
  frameworkComponents = {
    childMessageRenderer: ChildMessageRenderer
  };
  columnDefs = [
    // {
    //   headerName: '',
    //   field: '',
    //   width: 100,
    //   pinned: 'left',
    //   autoHeight: true,
    //   suppressFilter: true
    // },
    {
      headerName: 'Name',
      field: 'name',
      width: 100,
      pinned: 'left',
      autoHeight: true,
    },
    {
      headerName: 'ProjectName',
      field: 'projectName',
      width: 180,
      pinned: 'left'
    },
    {
      headerName: 'Status',
      field: 'status',
      width: 100,
      suppressFilter: true
    },
    {
      headerName: "Date",
      field: "date",
      width: 100,
      suppressFilter: true
    },
    {
      headerName: 'StartDate',
      field: 'startDate',
      width: 100,
      suppressFilter: true
    },
    {
      headerName: 'EndDate',
      field: 'endDate',
      width: 100,
      suppressFilter: true
    },
    {
      headerName: 'Leader',
      field: 'leader',
      width: 120
    },
    {
      headerName: 'Image',
      field: 'imageCount', 
      width: 80,
      suppressFilter: true
    },  
    {
      headerName: 'Unassigned',
      field: 'unassignedCount',
      width: 120,
      suppressFilter: true
    },
    {
      headerName: 'Ready',
      field: 'readyCount',
      width: 80,
      suppressFilter: true
    },
    {
      headerName: 'Annotated',
      field: 'annotatedCount',
      width: 120,
      suppressFilter: true
    },
    {
      headerName: 'ReviewRejected',
      field: 'reviewRejectedCount',
      width: 150,
      suppressFilter: true
    },
    {
      headerName: 'ReviewCorrected',
      field: 'reviewCorrectedCount',
      width: 150,
      suppressFilter: true
    },
    {
      headerName: 'ReviewPassed',
      field: 'reviewPassedCount',
      width: 150,
      suppressFilter: true
    },
    {
      headerName: 'CumulativeAnnotated',
      field: 'cumulativeAnnotatedCount',
      width: 180,
      suppressFilter: true
    },
    {
      headerName: 'CumulativeReviewRejected',
      field: 'cumulativeReviewRejectedCount',
      width: 180,
      suppressFilter: true
    },
    {
      headerName: 'CumulativeReviewCorrected',
      field: 'cumulativeReviewCorrectedCount',
      width: 180,
      suppressFilter: true
    }
  ];

  rowData = [{
    name: 'VSO_0416',
    projectName: 'Octant_RS',
    date: '2018-04-16',
    startDate: '2018-04-16',
    endDate: '2018-04-16',
    leader: 'tienvv',
    imageCount: 200,
    unassignedCount: 0,
    readyCount: 0,
    annotatedCount: 0,
    reviewRejectedCount: 0,
    reviewCorrectedCount: 0,
    reviewPassedCount: 200,
    cumulativeAnnotatedCount: 96,
    cumulativeReviewRejectedCount: 0,
    cumulativeReviewCorrectedCount: 0,
    status: 'deprecated'
  }, {
    name: 'VSO_0417',
    projectName: 'Octant_RS',
    date: '2018-04-16',
    startDate: '2018-04-16',
    endDate: '2018-04-16',
    leader: 'tienvv',
    imageCount: 200,
    unassignedCount: 0,
    readyCount: 0,
    annotatedCount: 0,
    reviewRejectedCount: 0,
    reviewCorrectedCount: 0,
    reviewPassedCount: 200,
    cumulativeAnnotatedCount: 96,
    cumulativeReviewRejectedCount: 0,
    cumulativeReviewCorrectedCount: 0,
    status: 'deprecated'
  }, {
    name: 'VSO_0418',
    projectName: 'Octant_RS',
    date: '2018-04-16',
    startDate: '2018-04-16',
    endDate: '2018-04-16',
    leader: 'tienvv',
    imageCount: 200,
    unassignedCount: 0,
    readyCount: 0,
    annotatedCount: 0,
    reviewRejectedCount: 0,
    reviewCorrectedCount: 0,
    reviewPassedCount: 200,
    cumulativeAnnotatedCount: 96,
    cumulativeReviewRejectedCount: 0,
    cumulativeReviewCorrectedCount: 0,
    status: 'deprecated'
  }, {
    name: 'VSO_0419',
    projectName: 'Octant_RS',
    date: '2018-04-16',
    startDate: '2018-04-16',
    endDate: '2018-04-16',
    leader: 'tienvv',
    imageCount: 200,
    unassignedCount: 0,
    readyCount: 0,
    annotatedCount: 0,
    reviewRejectedCount: 0,
    reviewCorrectedCount: 0,
    reviewPassedCount: 200,
    cumulativeAnnotatedCount: 96,
    cumulativeReviewRejectedCount: 0,
    cumulativeReviewCorrectedCount: 0,
    status: 'deprecated'
  }, {
    name: 'VSO_0420',
    projectName: 'Octant_RS',
    date: '2018-04-16',
    startDate: '2018-04-16',
    endDate: '2018-04-16',
    leader: 'tienvv',
    imageCount: 200,
    unassignedCount: 0,
    readyCount: 0,
    annotatedCount: 0,
    reviewRejectedCount: 0,
    reviewCorrectedCount: 0,
    reviewPassedCount: 200,
    cumulativeAnnotatedCount: 96,
    cumulativeReviewRejectedCount: 0,
    cumulativeReviewCorrectedCount: 0,
    status: 'deprecated'
  }, {
    name: 'VSO_0421',
    projectName: 'Octant_RS',
    date: '2018-04-16',
    startDate: '2018-04-16',
    endDate: '2018-04-16',
    leader: 'tienvv',
    imageCount: 200,
    unassignedCount: 0,
    readyCount: 0,
    annotatedCount: 0,
    reviewRejectedCount: 0,
    reviewCorrectedCount: 0,
    reviewPassedCount: 200,
    cumulativeAnnotatedCount: 96,
    cumulativeReviewRejectedCount: 0,
    cumulativeReviewCorrectedCount: 0,
    status: 'deprecated'
  }, {
    name: 'VSO_0422',
    projectName: 'Octant_RS',
    date: '2018-04-16',
    startDate: '2018-04-16',
    endDate: '2018-04-16',
    leader: 'tienvv',
    imageCount: 200,
    unassignedCount: 0,
    readyCount: 0,
    annotatedCount: 0,
    reviewRejectedCount: 0,
    reviewCorrectedCount: 0,
    reviewPassedCount: 200,
    cumulativeAnnotatedCount: 96,
    cumulativeReviewRejectedCount: 0,
    cumulativeReviewCorrectedCount: 0,
    status: 'deprecated'
  }];
  gridOptions = {
    floatingFilter:true,
    enableFilter: true,
    enableSorting: true,
    throttleScroll: true,
    suppressMenu: true,
    enableColResize: true,
    rowSelection: 'multiple',
    pagination: true,
    paginationPageSize: 50,
    rowData: this.rowData,
    columnDefs: this.columnDefs
  };
}
