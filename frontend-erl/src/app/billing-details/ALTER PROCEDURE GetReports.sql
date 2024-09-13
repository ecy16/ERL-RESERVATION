ALTER PROCEDURE GetReports
@fromDate DATETIME,@toDate DATETIME,@category varchar(20),@status varchar(20),
@driverName varchar(20),@registrationNo varchar(20)

AS
BEGIN
SET NOCOUNT ON
 declare @vehicleSearch varchar (200);
 
 --set @vehicleSearch = case when @registrationNo <>null then @registrationNo else '' end



 if @category ='vehicle by period' 
 begin
select 
a.VehicleMake,a.VehicleModel,a.vehicleRegNo,a.vehicleStatus,a.vehicleOwner,a.vehicleTransmission,
b.FromDateTime,b.ToDateTime,b.TripStatus,b.PickupAddress,b.DropAddress,
c.ReservationId,c.BookingStatus 
from _cplVehicles a join _cplReservationTrips b on 
a.vehicleID=b.VehicleId join _cplReservations c on b.ReservationId = c.ReservationId where b.TripStatus = @status 
and  vehicleRegNo = @registrationNo  and    (b.FromDateTime ) = ( @fromDate ) 
--and (b.FromDateTime ) <=  ( @toDate )
-- or (b.ToDateTime ) >=  ( @fromDate ) 
 and (b.ToDateTime ) <=( @toDate ) 
 END
 if @category = 'driver by period'
select 
a.DriverFirstName+' '+a.DriverLastName as driversName,
b.FromDateTime,b.ToDateTime,b.TripStatus,b.PickupAddress,b.DropAddress,
c.ReservationId,c.BookingStatus 
from _cplChaufferDrivers a join _cplReservationTrips b on a.DriverId=b.DriverId join _cplReservations c on b.ReservationId = c.ReservationId 
where b.TripStatus = @status and b.DriverId = @driverName 
  and    (b.FromDateTime ) = ( @fromDate ) --and (b.FromDateTime ) <=  ( @toDate )
 --or (b.ToDateTime ) >=  ( @fromDate ) 
 and (b.ToDateTime ) =( @toDate ) 


END

exec GetReports @fromDate ='2024-05-14 08:50:00.000' ,@toDate= '2024-05-14 08:50:00.000' ,@category = 'vehicle by period' ,@status = 'InProgress',
@driverName=NULL ,@registrationNo ='KCL 670P'

