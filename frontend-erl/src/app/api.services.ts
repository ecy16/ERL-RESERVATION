import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ToastrModule, ToastrService } from "ngx-toastr";
import { post } from "jquery";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

const url = 'localhost:3000'

@Injectable({
  providedIn: "root",
})


export class ApiService {


  // --------------Reservations---------------
  resvUrl = `http://${url}/api/reservations`;
  reservationCategories = `http://${url}/api/reservations/categories`;
  reservationTypes = `http://${url}/api/reservations/type`;
  reservationBranch = `http://${url}/api/reservations/branch`;
  reservationStatus = `http://${url}/api/reservations/status`;
  reservationSource = `http://${url}/api/reservations/source`;
  reservationCharge = `http://${url}/api/reservations/charge`;

  // --------------Trips---------------
  tripUrl = `http://${url}/api/trips`;
  updateTrip = `http://${url}/api/trips/update/`;
  // tripIncident = `http://${url}/api/trips-incidents`;
  fetchTripIds = `http://${url}/api/trips/trip/`;
  fetchRelatedReservationTrip = `http://${url}/api/trips/findTrip/`;
  fetchFuelLevel = `http://${url}/api/trips/fuelLevel`;
  driverServiceStatus = `http://${url}/api/trips/driverService`;
  tripStatus = `http://${url}/api/trips/tripStatus`;
  serviceStatus = `http://${url}/api/trips-services/status`;
  tripById = `http://${url}/api/trips/`;
  // tripUpdate = `http://${url}/api/trips/`

  // --------------Trips Services---------------
  tripService = `http://${url}/api/trips-services`;
  tripServiceName = `http://${url}/api/trips-services/sage`;
  serviceSageInfo = `http://${url}/api/trips-services/sage/`;
  getTripServices = `http://${url}/api/trips-services/services/`;
  getTripServiceInfo = `http://${url}/api/trips-services/serviceInfo/`;
  // services/:reservationId

  // --------------Trips Incidents---------------
  tripIncident = `http://${url}/api/trips-incidents`;
  tripIncidentTypes = `http://${url}/api/trips-incidents/types`;
  relatedTripIncidents = `http://${url}/api/trips-incidents/incident/`;

  // --------------Customer/Companies---------------
  companies = `http://${url}/api/clients`;
  relatedCompCode = `http://${url}/api/clients/code/`;
  relatedCompName = `http://${url}/api/clients/name/`;
  // --------------Vehicles---------------
  vehicleUrl = `http://${url}/api/vehicles`;
  vehicleMasterUrl = `http://${url}/api/vehicle-master`;
  vehicleModel = `http://${url}/api/vehicles/vehicle/`
  // vehicleModelUrl = `http://${url}/api/vehicle-master/`;

  // --------------System Users---------------
  usersUrl = `http://${url}/api/users`;
  // --------------Drivers---------------

  driversUrl = `http://${url}/api/self-drivers`;
  driverById = `http://${url}/api/self-drivers/`;
  relatedDrivers = `http://${url}/api/self-drivers/related/`;
  updateDriverUrl = `http://${url}/api/self-drivers/update/`;

  // --------------Search Value---------------
  searchValueUrl = `http://${url}/api/reservations`;
  searchResourcesValue = `http://${url}/api/reservations/search/`;


  // <.............>
  resvDoc = `http://${url}/api/reservation-documents/`;

  //<...................>
  upload = `http://${url}/api/vehicles/upload`;
  filesUrl = `http://${url}/api/photos`;
  vehicleFiles = `http://${url}/api/vehicles/uploadFile`;
  RaUrl = `http://${url}/api/reservation-documents`

  importVehiclesData = `http://${url}/api/vehicles/uploadBatch`;

  //chaufferDrivers//
  chaufferDriversUrl = `http://${url}/api/chauffer-drivers`;
  // <------phone------>
  url = 'assets/phoneCode.json';

  //Contracts
  contractUrl = `http://${url}/api/contracts`;


  //contractDetails
  contractDetailsUrl = `http://${url}/api/contract-details`;

  contractInfoUrl = `http://${url}/api/contract-details/related/`;


  //ChargeCurr
  chargeUrl = `http://${url}/api/contract-details`;


  ///Auth


  // <-----Tranactions-------------->
  
transactionsUrl=`http://${url}/api/transactions`
transactionsUrlUpdate=`http://${url}/api/transactions/update/`



  authUrl = `http://${url}/api/auth`


  resetUrl = `http://${url}/api/auth`


  vehicleValidateUrl = `http://${url}/api/trips/validateVehicle`
  driverValidateUrl = `http://${url}/api/trips/validateDriver`

  // <////////////////Billings//////////>

  billngUrl = `http://${url}/api/billing`

  constructor(private http: HttpClient) { }

  // <////////signin//////>

  register(signupForm: any) {
    return this.http.post<any[]>(`${this.authUrl}/signup`, signupForm)
  }
  login(loginForm: any) {
    return this.http.post<any[]>(`${this.authUrl}/signin`, loginForm)
  }
  forgotPassword(EmailAddress: string) {
    return this.http.post<any[]>(`${this.resetUrl}/forgot-password`, { EmailAddress });
  }

  getPhoneCodes(): Observable<any> {
    return this.http.get(this.url)
  }

  addVehicle(vehicleForm: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.vehicleUrl}/create`, vehicleForm);
  }
  addNewUser(usersForm: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.usersUrl}/add`, usersForm);
  }
  // addUser(usersForm: any): Observable<any[]> {
  //   return this.http.post<any[]>(`${this.usersUrl}/addUsers`, usersForm);
  // }
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.usersUrl}/allUsers`);
  }

  addDrivers(driverForm: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.driversUrl}/create`, driverForm);
  }
  updateDriver(driverForm: any): Observable<any[]> {
    return this.http.patch<any[]>(`${this.updateDriverUrl}`, driverForm);
  }
  getDriversById(reservationId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.driverById}` + reservationId);
  }
  getRelatedDrivers(reservationId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.relatedDrivers}` + reservationId);
  }
  editDrivers(BookingDriverId: any, driverFormUpdate: any): Observable<any[]> {
    return this.http.patch<any[]>(
      `${this.updateDriverUrl}` + BookingDriverId,
      driverFormUpdate
    );
  }

  // <--------CONTRACTS------->
  addContract(contractForm: any): Observable<any> {
    return this.http.post<any[]>(`${this.contractUrl}/create`, contractForm);
  }
  getContracts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.contractUrl}`);
  }
  findDemandContracts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.contractUrl}/demand`);
  }

  updateContract(ContractId: any, contractForm: any): Observable<any> {
    return this.http.patch<any[]>(`${this.contractUrl}` + ContractId, contractForm);
  }
  getByIdContracts(ContractId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.contractUrl}/` + ContractId);
  }
  getOneContractById(ContractId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.contractUrl}/` + ContractId);
  }

  getContractById(ContractId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.contractUrl}/` + ContractId);
  }



  editContracts(ContractId: any, contractEditForm: any): Observable<any[]> {
    return this.http.patch<any[]>(
      `${this.contractUrl}/` + ContractId,
      contractEditForm
    );
  }
  searchContracts(Body: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.contractUrl}/search`, Body)
  }

  // <--------------CONTRACTDETAILS---------->
  addContractDetails(contractDetailForm: any): Observable<any> {
    return this.http.post<any[]>(`${this.contractDetailsUrl}/create`, contractDetailForm);
  }
  getOneContractDetailsById(ContractDetailsId: any): Observable<any> {
    return this.http.get<any[]>(`${this.contractInfoUrl}` + ContractDetailsId);
  }

  getContractsDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.contractDetailsUrl}`);
  }

  getRelatedContractDetails(ContractId: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.contractDetailsUrl}/related/` + ContractId, '');
  }
  editContractsDetails(ContractDetailsId: any, contractEditDetailForm: any): Observable<any[]> {
    return this.http.patch<any[]>(
      `${this.contractDetailsUrl}/` + ContractDetailsId,
      contractEditDetailForm
    );
  }
  findContracts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.contractUrl}`)
  }
  getDocuments(reservationId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.resvDoc}` + reservationId)
  }
  addChaufferDriver(OurDriversForm: any): Observable<any> {
    return this.http.post<any[]>(`${this.chaufferDriversUrl}/create`, OurDriversForm)
  }
  searchChauffer(Body: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.chaufferDriversUrl}/search/chauffer`, Body)
  }

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.resvUrl}`);
  }
  getAllVehicles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.vehicleUrl}`);

  }


  getAllChauffers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.chaufferDriversUrl}`)
  }
  fetchAllChauffers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.chaufferDriversUrl}`)
  }

  searchValue(Body: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.searchValueUrl}/search`, Body)
  }

  searchResourcesResults(Body: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.resvUrl}/search`, Body)
  }
  searchAss(Body: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.tripUrl}/search`, Body)
  }

  searchVehicles(Body: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.vehicleUrl}/search`, Body)
  }

  getChaufferById(name: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.chaufferDriversUrl}` + name)
  }
  getVehicleByModel(model: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.vehicleModel}` + model)
  }
  getReservationx(): Observable<any[]> {
    return this.http.get<any[]>(`${this.resvUrl}`);
  }
  addReservation(bookingForm: any): Observable<any> {
    return this.http.post<any[]>(`${this.resvUrl}/create`, bookingForm);
  }
  editReservations(bookingForm: any): Observable<any[]> {
    return this.http.patch<any[]>(`${this.resvUrl}/:id`, bookingForm);
  }
  getReservationsById(Id: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.resvUrl}/` + Id);
  }
  fetchReservation(Id: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.resvUrl}/` + Id);
  }
  fetchOneReservation(Id: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.resvUrl}/details/` + Id);
  }
  addTrip(tripForm: any): Observable<any> {
    return this.http.post<any[]>(`${this.tripUrl}/create`, tripForm);
  }
  editTrip(TripId: any, tripForm: any): Observable<any> {
    return this.http.patch<any[]>(`${this.updateTrip}` + TripId, tripForm);
  }
  updateTripById(TripId: any, tripForm: any): Observable<any> {
    return this.http.patch<any[]>(`${this.updateTrip}` + TripId, tripForm);
  }
  fetchTrips(TripId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.tripUrl}/` + TripId);
  }
  getOneTrip(TripId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.tripUrl}/ById/` + TripId);
  }

  // -------------------------------------Trip Service-------------------------------------
  //-------save trip service-------
  addTripService(tripServicesForm: any): Observable<any> {
    return this.http.post<any[]>(
      `${this.tripService}/create`,
      tripServicesForm
    );
  }
  //-------edit trip service-------
  editTripService(serviceId: number, tripServicesForm: any): Observable<any> {
    return this.http.patch<any[]>(
      `${this.tripService}/` + serviceId,
      tripServicesForm
    );
  }

  //------- fetch related trip services-------
  getRelatedTripServices(reservationId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.getTripServices}` + reservationId);
  }

  //------- fetch related trip services info-------
  getRelatedTripServiceInfo(serviceId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.getTripServiceInfo}` + serviceId);
  }
  //------- fetch related sage services info-------
  getServiceSageInfo(serviceName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.serviceSageInfo}` + [serviceName]);
  }
  fetchSageServices(reservationId: number): Observable<any[]> {
    return this.http.post<any[]>(`${this.tripServiceName}`, reservationId);
  }

  getCompanies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.companies}`);
  }
  addTripIncident(tripIncidentsForm: any): Observable<any> {
    return this.http.post<any[]>(
      `${this.tripIncident}/create`,
      tripIncidentsForm
    );
  }

  getClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.companies}`);
  }
  getBookingCategories(): Observable<any[]> {
    return this.http.post<any[]>(`${this.reservationCategories}`, "");
  }
  // getCharges(id:string): Observable<any[]> {
  //   return this.http.post<any[]>(`${this.chargeUrl}`, "");
  // }

  getCharges(): Observable<any[]> {
    return this.http.get<any[]>(`${this.chargeUrl}`);
  }


  getFuelLevel(): Observable<any[]> {
    return this.http.post<any[]>(`${this.fetchFuelLevel}`, "");
  }
  getDriverServiceStatus(): Observable<any[]> {
    return this.http.post<any[]>(`${this.driverServiceStatus}`, "");
  }
  getTripStatus(): Observable<any[]> {
    return this.http.post<any[]>(`${this.tripStatus}`, "");
  }
  getServiceStatus(): Observable<any[]> {
    return this.http.post<any[]>(`${this.serviceStatus}`, "");
  }
  getIncidentsType(): Observable<any[]> {
    return this.http.post<any[]>(`${this.tripIncidentTypes}`, "");
  }
  getServiceName(): Observable<any[]> {
    return this.http.post<any[]>(`${this.tripServiceName}`, "");
  }
  getTripById(TripId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.tripById}` + TripId);
  }
  //   getBookingCharge(): Observable<any[]> {
  //     return this.http.post<any[]>(`${this.charge}`, "");
  //   }

  //file and image upload
  uploadImage(): Observable<any> {
    // console.log(`image upload'${image.name}`);
    return this.http.post<any[]>(`${this.upload}`, '')
  }
  uploadFile(): Observable<any> {
    return this.http.post<any[]>(`${this.filesUrl}`, "")
  }

  getVehicleRegistration(): Observable<any[]> {
    return this.http.get<any[]>(`${this.vehicleUrl}`);
  }
  getVehicleModel(Make: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.vehicleMasterUrl}/` + Make);
  }
  getVehicleMake(): Observable<any[]> {
    return this.http.get<any[]>(`${this.vehicleMasterUrl}/`);
  }
  getVehicleType(Model: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.vehicleMasterUrl}/Types/` + Model);
  }

  getVehicleMakeAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.vehicleMasterUrl}`);
  }
  getBookingTypes(): Observable<any[]> {
    return this.http.post<any[]>(`${this.reservationTypes}`, "");
  }
  getBookingBranch(): Observable<any[]> {
    return this.http.post<any[]>(`${this.reservationBranch}`, "");
  }
  getBookingStatus(): Observable<any[]> {
    return this.http.post<any[]>(`${this.reservationStatus}`, "");
  }
  getBookingSource(): Observable<any[]> {
    return this.http.post<any[]>(`${this.reservationSource}`, "");
  }
  getBookingCharge(): Observable<any[]> {
    return this.http.post<any[]>(`${this.reservationCharge}`, "");
  }

  getRelatedTrip(TripId: number): Observable<any[]> {
    return (
      this.http.get<any[]>(`${this.fetchTripIds}` + TripId)
    );
  }
  getAssgTrip(TripId: number): Observable<any[]> {
    return (
      this.http.get<any[]>(`${this.fetchTripIds}` + TripId)
    );
  }

  getRelatedReservationTrip(reservationId: number): Observable<any[]> {
    return (
      this.http.get<any[]>(`${this.fetchRelatedReservationTrip}` + reservationId)
    );
  }
  fetchLastRelatedTrips(reservationId: number): Observable<any[]> {
    return (
      this.http.get<any[]>(`${this.fetchRelatedReservationTrip}` + reservationId)
    );
  }
  fetchAllTrips(): Observable<any[]> {
    return (
      this.http.post<any[]>(`${this.tripUrl}/all`, "")
    )
  }

  getAllTrip(): Observable<any[]> {
    return this.http.get<any[]>(`${this.tripUrl}`)
  }

  getSortedTrips(): Observable<any[]> {
    return this.http.post<any[]>(`${this.tripUrl}/sorted`, '')

  }
  fetchDeliverTrips(TripId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.tripUrl}/delivered/${TripId}`)

  }

  getRelatedTripIncidents(
    reservationId: number,
    TripId: any
  ): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.relatedTripIncidents}` + reservationId + TripId
    );
  }

  getRelatedCustCode(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.relatedCompCode}` + name);
  }
  getRelatedCustName(code: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.relatedCompName}` + code);
  }
  getRelatedCharge(ContractId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.chargeUrl}/curr/${ContractId}`);
  }
  getCustomerName(ContractId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.relatedCompName}` + ContractId);
  }
  getRelatedChargeType(ContractId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.chargeUrl}/chargeType/${ContractId}`);
  }

  findCurr(): Observable<any> {
    return this.http.get(`${this.chargeUrl}/curr`);
  }
  assignVehicle(model: any): Observable<any> {
    return this.http.get(`${this.tripUrl}/assign-car/` + model);
  }

  validateVehicle(vehicleDetails: any): Observable<any> {
    return this.http.post<any[]>(`${this.vehicleValidateUrl}`, vehicleDetails)
  }
  validateDriver(DriverDetails: any): Observable<any> {
    // console.log('ammar', vehicleDetails);
    return this.http.post<any[]>(`${this.driverValidateUrl}`, DriverDetails)
  }


  getAllBillings() {
    return this.http.get(`${this.billngUrl}`);
  }
  GetBillById(Id: any) {
    return this.http.post(`${this.billngUrl}/bill/` + Id, "");
  }

  getBill(Id: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.billngUrl}/` + Id);
  }


  importVehicles(file: any) {
    return this.http.post(`${this.importVehiclesData}`, file);
  }


  uploadVehicleFiles(file: any) {
    return this.http.post(`${this.vehicleFiles}`, file)
  }

  uploadResvFile(file: any) {
    return this.http.post(`${this.filesUrl}/UploadFile`, file)

  }

  // addVehicleMovement(TripId: any, deliveryForm: any) {
  //   return this.http.post(`${this.filesUrl}/UploadFile`, deliveryForm)

  // }
  addTransaction(deliveryForm:any) {
    return this.http.post(`${this.transactionsUrl}/create`, deliveryForm)

  }
  
  fetchAllTransactions() {
    return this.http.get(`${this.transactionsUrl}`);
  }
  updateTransactions(id:any,deliveryForm:any): Observable<any[]> {
    return this.http.patch<any[]>(`${this.transactionsUrlUpdate}`+ id,deliveryForm);
  }
  // updateTripById(TripId: any, tripForm: any): Observable<any> {
  //   return this.http.patch<any[]>(`${this.updateTrip}` + TripId, tripForm);
  // }
  fetchTransactionsById(TransactionId: any) {
    return this.http.get(`${this.transactionsUrl}/ById/10`);
  }

  getRentalAgreement() {
    return this.http.get<any[]>(`${this.RaUrl}/id`)
  }






}