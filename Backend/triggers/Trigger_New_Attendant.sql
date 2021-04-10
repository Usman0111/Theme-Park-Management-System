CREATE OR REPLACE FUNCTION attendant_notify_manager()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
	IF NEW.user_type = 'attendant' THEN
		PERFORM pg_notify('new_attendant_notification', '{"message":"Please, assign work to new attendant", "attendant_id":'||NEW.account_id||'}');
	END IF;
	RETURN NEW;
END;
$$

CREATE TRIGGER new_attendant
  AFTER INSERT
  ON UserAccount
  FOR EACH ROW
  EXECUTE PROCEDURE attendant_notify_manager();


