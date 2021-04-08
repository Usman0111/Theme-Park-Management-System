CREATE OR REPLACE FUNCTION purchase_refuse()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
DECLARE
	count integer;
BEGIN
	SELECT COUNT(*) FROM entrypass WHERE customer_id=NEW.customer_id AND expired=false into count;
	IF count THEN
		PERFORM pg_notify('db_notifications', 'already have entrypass');
		RETURN NULL;
		
	END IF;
	RETURN NEW;
END;
$$


CREATE TRIGGER new_entrypass
  BEFORE INSERT
  ON entrypass
  FOR EACH ROW
  EXECUTE PROCEDURE purchase_refuse();


