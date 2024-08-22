import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Layouts/header/header.component';
import { SideBarComponent } from './Layouts/side-bar/side-bar.component';
import { VehiclesComponent } from './MasterScreen/vehicles/vehicles.component';
import { FooterComponent } from './Layouts/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, HeaderComponent, SideBarComponent,VehiclesComponent,FooterComponent],
})
export class AppComponent {
  title = 'ERL';
}
