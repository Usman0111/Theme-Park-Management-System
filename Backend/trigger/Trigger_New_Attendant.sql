CREATE OR REPLACE FUNCTION attendent_notify_manager()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
	IF NEW.user_type = 'attendant' THEN
		PERFORM pg_notify('new_attendant_notification', 'Manager, please assign work to new attendant');
	END IF;
	RETURN NEW;
END;
$$



CREATE TRIGGER new_attendent
  BEFORE INSERT
  ON UserAccount
  FOR EACH ROW
  EXECUTE PROCEDURE attendent_notify_manager();


