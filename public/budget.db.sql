BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "CURRENCY" (
	"ID_CURRENCY"	INTEGER NOT NULL,
	"NAME"	TEXT,
	"PREFIX"	TEXT,
	PRIMARY KEY("ID_CURRENCY" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "TRANSACTION_TYPE" (
	"ID_TRANSACTION_TYPE"	INTEGER NOT NULL,
	"NAME"	TEXT,
	PRIMARY KEY("ID_TRANSACTION_TYPE" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "CATEGORY" (
	"ID_CATEGORY"	INTEGER NOT NULL,
	"NAME"	TEXT,
	PRIMARY KEY("ID_CATEGORY" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "TRANSACTION" (
	"ID_TRANSACTION"	INTEGER NOT NULL,
	"ID_TYPE"	INTEGER NOT NULL,
	"ID_CATEGORY"	INTEGER NOT NULL,
	"ID_CURRENCY"	INTEGER NOT NULL,
	"DATE"	TEXT NOT NULL,
	"AMOUNT"	REAL NOT NULL,
	"TITLE"	TEXT NOT NULL,
	PRIMARY KEY("ID_TRANSACTION" AUTOINCREMENT),
	FOREIGN KEY("ID_TYPE") REFERENCES "TRANSACTION_TYPE"("ID_TRANSACTION_TYPE"),
	FOREIGN KEY("ID_CATEGORY") REFERENCES "CATEGORY"("ID_CATEGORY"),
	FOREIGN KEY("ID_CURRENCY") REFERENCES "CURRENCY"("ID_CURRENCY")
);
INSERT INTO "CURRENCY" VALUES (1,'ZŁOTY','PLN');
INSERT INTO "CURRENCY" VALUES (2,'DOLAR','USD');
INSERT INTO "CURRENCY" VALUES (3,'EURO','EUR');
INSERT INTO "CURRENCY" VALUES (4,'FRANK SZWAJCARSKI','CHF');
INSERT INTO "TRANSACTION_TYPE" VALUES (1,'PRZYCHÓD');
INSERT INTO "TRANSACTION_TYPE" VALUES (2,'WYDATEK');
INSERT INTO "CATEGORY" VALUES (1,'TRANSPORT');
INSERT INTO "CATEGORY" VALUES (2,'ZDROWIE I URODA');
INSERT INTO "CATEGORY" VALUES (3,'RACHUNKI');
INSERT INTO "CATEGORY" VALUES (4,'POZOSTAŁE');
INSERT INTO "CATEGORY" VALUES (5,'FINANSE');
INSERT INTO "CATEGORY" VALUES (6,'ROZRYWKA I PODRÓŻE');
INSERT INTO "CATEGORY" VALUES (7,'WYDATKI PODSTAWOWE');
INSERT INTO "CATEGORY" VALUES (8,'UZNANIA');
INSERT INTO "TRANSACTION" VALUES (1,2,1,1,'2022-12-12',21.0,'wydatek');
INSERT INTO "TRANSACTION" VALUES (2,1,2,2,'2022-10-01',32.0,'przychód 1');
INSERT INTO "TRANSACTION" VALUES (3,1,2,2,'2022-10-04',37.0,'przychód 2');
COMMIT;