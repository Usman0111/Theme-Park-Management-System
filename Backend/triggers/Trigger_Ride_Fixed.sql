CREATE OR REPLACE FUNCTION maintainer_notify_attendant()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
	IF NEW.maintainer_id IS NOT NULL AND NEW.fullfilled = TRUE THEN
		PERFORM pg_notify('ride_fixed_notification', '{"message":"Your assigned ride has been fixed", "attendant_id":'||NEW.attendant_id||', "ride_id":'||NEW.ride_id||', "maintainer_id": '||NEW.maintainer_id||'}');
	END IF;
	RETURN NEW;
END;
$$


CREATE TRIGGER ride_fixed
  AFTER UPDATE
  ON RideBreakdowns
  FOR EACH ROW
  EXECUTE PROCEDURE maintainer_notify_attendant();


