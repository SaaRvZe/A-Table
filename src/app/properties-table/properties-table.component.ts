import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PropertiesService } from 'src/services/properties.service';
import { Status } from 'src/assets/models/status';
import { PROPERTYSTATUSES, TENANTSTATUSES } from 'src/assets/mock-data/statuses'


@Component({
  selector: 'app-properties-table',
  templateUrl: './properties-table.component.html',
  styleUrls: ['./properties-table.component.scss']
})
export class PropertiesTableComponent implements OnInit, AfterViewInit {
  
  constructor(private properiesService: PropertiesService) { }

  propertiesDataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  propertyStatuses: Status[] = PROPERTYSTATUSES;
  tenantStatuses: Status[] =  TENANTSTATUSES;

  isLoading = true;  
  columnsToDisplay = ['createdOn', 'address', 'occupiedStats',
      'plan', 'owner', 'ownerStatus', 'tenant', 'tenantStatus'];
  
  filterValues: any = {
    propertyStatusFilter: '',
    tenantStatusFilter: ''
  }  
    
  ngOnInit(): void {
    this.propertiesDataSource.filterPredicate = function(data: any, filter): boolean{
      let filters = JSON.parse(filter);
      let dataPropertyStatus =  data.occupiedStats?.toLowerCase().trim()
      let dataTenantStatus = data.tenant?.tenantStatus?.toLowerCase().trim();
      let propertyStatusFilter = filters.propertyStatusFilter.toLowerCase().trim();
      let tenantStatusFilter = filters.tenantStatusFilter?.toLowerCase().trim();
      
      return ( dataPropertyStatus == propertyStatusFilter
                ||  ( propertyStatusFilter == 'active' && (dataPropertyStatus == 'occupied' || dataPropertyStatus == 'vacant'))
                    || propertyStatusFilter == '') 
                && (dataTenantStatus == tenantStatusFilter
                    || tenantStatusFilter == '' );
    }
    
    this.properiesService.getProperties().subscribe(data =>{                  
      setTimeout(()=>{
      this.propertiesDataSource.data = data.properties;
      this.isLoading = false;      
      }, 2000);
      }, error => this.isLoading = false
    );    
  }

  ngAfterViewInit() {
    this.propertiesDataSource.paginator = this.paginator;
  }

  filterByStatuses(){    
    this.propertiesDataSource.filter = JSON.stringify(this.filterValues);
  }

}
