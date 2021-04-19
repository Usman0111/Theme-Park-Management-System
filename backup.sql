PGDMP     2    !                y           tpms    12.5    13.2 `    r           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            s           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            t           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            u           1262    16396    tpms    DATABASE     Y   CREATE DATABASE tpms WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE tpms;
                postgres    false            �            1255    16734    attendant_notify_manager()    FUNCTION     4  CREATE FUNCTION public.attendant_notify_manager() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
IF NEW.user_type = 'attendant' THEN
PERFORM pg_notify('new_attendant_notification', '{"message":"Please, assign work to new attendant", "attendant_id":'||NEW.account_id||'}');
END IF;
RETURN NEW;
END;
$$;
 1   DROP FUNCTION public.attendant_notify_manager();
       public          postgres    false            �            1255    16736    maintainer_notify_attendant()    FUNCTION     |  CREATE FUNCTION public.maintainer_notify_attendant() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
IF NEW.maintainer_id IS NOT NULL THEN
PERFORM pg_notify('ride_fixed_notification', '{"message":"Your assigned ride has been fixed", "attendant_id":'||NEW.attendant_id||', "ride_id":'||NEW.ride_id||', "maintainer_id": '||NEW.maintainer_id||'}');
END IF;
RETURN NEW;
END;
$$;
 4   DROP FUNCTION public.maintainer_notify_attendant();
       public          postgres    false            �            1259    16618    attendantassignment    TABLE     �   CREATE TABLE public.attendantassignment (
    assignment_id integer NOT NULL,
    attendant_id integer NOT NULL,
    assignment_type character varying(50) NOT NULL
);
 '   DROP TABLE public.attendantassignment;
       public         heap    postgres    false            �            1259    16616 %   attendantassignment_assignment_id_seq    SEQUENCE     �   CREATE SEQUENCE public.attendantassignment_assignment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public.attendantassignment_assignment_id_seq;
       public          postgres    false    211            v           0    0 %   attendantassignment_assignment_id_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public.attendantassignment_assignment_id_seq OWNED BY public.attendantassignment.assignment_id;
          public          postgres    false    210            �            1259    16606 
   attraction    TABLE     {  CREATE TABLE public.attraction (
    attraction_id integer NOT NULL,
    name character varying(1000) NOT NULL,
    description character varying(1000) NOT NULL,
    location character varying(1000) NOT NULL,
    rainedout boolean NOT NULL,
    age_restriction integer,
    picture character varying(300),
    archived boolean DEFAULT false NOT NULL,
    attendant_id integer
);
    DROP TABLE public.attraction;
       public         heap    postgres    false            �            1259    16604    attraction_attraction_id_seq    SEQUENCE     �   CREATE SEQUENCE public.attraction_attraction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.attraction_attraction_id_seq;
       public          postgres    false    209            w           0    0    attraction_attraction_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.attraction_attraction_id_seq OWNED BY public.attraction.attraction_id;
          public          postgres    false    208            �            1259    16721    attractionrainout    TABLE     �   CREATE TABLE public.attractionrainout (
    rainout_id integer NOT NULL,
    attraction_id integer NOT NULL,
    date_rainedout date DEFAULT CURRENT_DATE NOT NULL,
    attendant_id integer
);
 %   DROP TABLE public.attractionrainout;
       public         heap    postgres    false            �            1259    16719     attractionrainout_rainout_id_seq    SEQUENCE     �   CREATE SEQUENCE public.attractionrainout_rainout_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.attractionrainout_rainout_id_seq;
       public          postgres    false    223            x           0    0     attractionrainout_rainout_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.attractionrainout_rainout_id_seq OWNED BY public.attractionrainout.rainout_id;
          public          postgres    false    222            �            1259    16687    attractionvisit    TABLE     �   CREATE TABLE public.attractionvisit (
    visit_id integer NOT NULL,
    attraction_id integer NOT NULL,
    customer_id integer NOT NULL,
    date_visited date DEFAULT CURRENT_DATE NOT NULL,
    visit_count integer DEFAULT 1
);
 #   DROP TABLE public.attractionvisit;
       public         heap    postgres    false            �            1259    16685    attractionvisit_visit_id_seq    SEQUENCE     �   CREATE SEQUENCE public.attractionvisit_visit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.attractionvisit_visit_id_seq;
       public          postgres    false    219            y           0    0    attractionvisit_visit_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.attractionvisit_visit_id_seq OWNED BY public.attractionvisit.visit_id;
          public          postgres    false    218            �            1259    16581    customerinfo    TABLE     �   CREATE TABLE public.customerinfo (
    info_id integer NOT NULL,
    customer_id integer NOT NULL,
    dob date NOT NULL,
    height integer NOT NULL
);
     DROP TABLE public.customerinfo;
       public         heap    postgres    false            �            1259    16579    customerinfo_info_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customerinfo_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.customerinfo_info_id_seq;
       public          postgres    false    205            z           0    0    customerinfo_info_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.customerinfo_info_id_seq OWNED BY public.customerinfo.info_id;
          public          postgres    false    204            �            1259    16631 	   entrypass    TABLE     �   CREATE TABLE public.entrypass (
    entrypass_id integer NOT NULL,
    customer_id integer NOT NULL,
    time_purchased timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.entrypass;
       public         heap    postgres    false            �            1259    16629    entrypass_entrypass_id_seq    SEQUENCE     �   CREATE SEQUENCE public.entrypass_entrypass_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.entrypass_entrypass_id_seq;
       public          postgres    false    213            {           0    0    entrypass_entrypass_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.entrypass_entrypass_id_seq OWNED BY public.entrypass.entrypass_id;
          public          postgres    false    212            �            1259    16594    ride    TABLE     �  CREATE TABLE public.ride (
    ride_id integer NOT NULL,
    name character varying(1000) NOT NULL,
    description character varying(1000) NOT NULL,
    location character varying(1000) NOT NULL,
    broken boolean NOT NULL,
    rainedout boolean NOT NULL,
    age_restriction integer,
    height_restriction integer,
    picture character varying(300),
    archived boolean DEFAULT false NOT NULL,
    attendant_id integer
);
    DROP TABLE public.ride;
       public         heap    postgres    false            �            1259    16592    ride_ride_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ride_ride_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.ride_ride_id_seq;
       public          postgres    false    207            |           0    0    ride_ride_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.ride_ride_id_seq OWNED BY public.ride.ride_id;
          public          postgres    false    206            �            1259    16645    ridebreakdowns    TABLE       CREATE TABLE public.ridebreakdowns (
    breakdown_id integer NOT NULL,
    ride_id integer NOT NULL,
    maintainer_id integer,
    breakdown_date date DEFAULT CURRENT_DATE NOT NULL,
    breakdown_description character varying(1000),
    attendant_id integer
);
 "   DROP TABLE public.ridebreakdowns;
       public         heap    postgres    false            �            1259    16643    ridebreakdowns_breakdown_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ridebreakdowns_breakdown_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.ridebreakdowns_breakdown_id_seq;
       public          postgres    false    215            }           0    0    ridebreakdowns_breakdown_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.ridebreakdowns_breakdown_id_seq OWNED BY public.ridebreakdowns.breakdown_id;
          public          postgres    false    214            �            1259    16707    riderainout    TABLE     �   CREATE TABLE public.riderainout (
    rainout_id integer NOT NULL,
    ride_id integer NOT NULL,
    date_rainedout date DEFAULT CURRENT_DATE NOT NULL,
    attendant_id integer
);
    DROP TABLE public.riderainout;
       public         heap    postgres    false            �            1259    16705    riderainout_rainout_id_seq    SEQUENCE     �   CREATE SEQUENCE public.riderainout_rainout_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.riderainout_rainout_id_seq;
       public          postgres    false    221            ~           0    0    riderainout_rainout_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.riderainout_rainout_id_seq OWNED BY public.riderainout.rainout_id;
          public          postgres    false    220            �            1259    16667 	   rideusage    TABLE     �   CREATE TABLE public.rideusage (
    usage_id integer NOT NULL,
    customer_id integer NOT NULL,
    ride_id integer NOT NULL,
    date_used date DEFAULT CURRENT_DATE NOT NULL,
    usage_count integer DEFAULT 1
);
    DROP TABLE public.rideusage;
       public         heap    postgres    false            �            1259    16665    rideusage_usage_id_seq    SEQUENCE     �   CREATE SEQUENCE public.rideusage_usage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.rideusage_usage_id_seq;
       public          postgres    false    217                       0    0    rideusage_usage_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.rideusage_usage_id_seq OWNED BY public.rideusage.usage_id;
          public          postgres    false    216            �            1259    16573    useraccount    TABLE     (  CREATE TABLE public.useraccount (
    account_id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    user_type character varying(50) NOT NULL
);
    DROP TABLE public.useraccount;
       public         heap    postgres    false            �            1259    16571    useraccount_account_id_seq    SEQUENCE     �   CREATE SEQUENCE public.useraccount_account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.useraccount_account_id_seq;
       public          postgres    false    203            �           0    0    useraccount_account_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.useraccount_account_id_seq OWNED BY public.useraccount.account_id;
          public          postgres    false    202            �           2604    16621 !   attendantassignment assignment_id    DEFAULT     �   ALTER TABLE ONLY public.attendantassignment ALTER COLUMN assignment_id SET DEFAULT nextval('public.attendantassignment_assignment_id_seq'::regclass);
 P   ALTER TABLE public.attendantassignment ALTER COLUMN assignment_id DROP DEFAULT;
       public          postgres    false    210    211    211            �           2604    16609    attraction attraction_id    DEFAULT     �   ALTER TABLE ONLY public.attraction ALTER COLUMN attraction_id SET DEFAULT nextval('public.attraction_attraction_id_seq'::regclass);
 G   ALTER TABLE public.attraction ALTER COLUMN attraction_id DROP DEFAULT;
       public          postgres    false    208    209    209            �           2604    16724    attractionrainout rainout_id    DEFAULT     �   ALTER TABLE ONLY public.attractionrainout ALTER COLUMN rainout_id SET DEFAULT nextval('public.attractionrainout_rainout_id_seq'::regclass);
 K   ALTER TABLE public.attractionrainout ALTER COLUMN rainout_id DROP DEFAULT;
       public          postgres    false    223    222    223            �           2604    16690    attractionvisit visit_id    DEFAULT     �   ALTER TABLE ONLY public.attractionvisit ALTER COLUMN visit_id SET DEFAULT nextval('public.attractionvisit_visit_id_seq'::regclass);
 G   ALTER TABLE public.attractionvisit ALTER COLUMN visit_id DROP DEFAULT;
       public          postgres    false    218    219    219            �           2604    16584    customerinfo info_id    DEFAULT     |   ALTER TABLE ONLY public.customerinfo ALTER COLUMN info_id SET DEFAULT nextval('public.customerinfo_info_id_seq'::regclass);
 C   ALTER TABLE public.customerinfo ALTER COLUMN info_id DROP DEFAULT;
       public          postgres    false    204    205    205            �           2604    16634    entrypass entrypass_id    DEFAULT     �   ALTER TABLE ONLY public.entrypass ALTER COLUMN entrypass_id SET DEFAULT nextval('public.entrypass_entrypass_id_seq'::regclass);
 E   ALTER TABLE public.entrypass ALTER COLUMN entrypass_id DROP DEFAULT;
       public          postgres    false    213    212    213            �           2604    16597    ride ride_id    DEFAULT     l   ALTER TABLE ONLY public.ride ALTER COLUMN ride_id SET DEFAULT nextval('public.ride_ride_id_seq'::regclass);
 ;   ALTER TABLE public.ride ALTER COLUMN ride_id DROP DEFAULT;
       public          postgres    false    206    207    207            �           2604    16648    ridebreakdowns breakdown_id    DEFAULT     �   ALTER TABLE ONLY public.ridebreakdowns ALTER COLUMN breakdown_id SET DEFAULT nextval('public.ridebreakdowns_breakdown_id_seq'::regclass);
 J   ALTER TABLE public.ridebreakdowns ALTER COLUMN breakdown_id DROP DEFAULT;
       public          postgres    false    214    215    215            �           2604    16710    riderainout rainout_id    DEFAULT     �   ALTER TABLE ONLY public.riderainout ALTER COLUMN rainout_id SET DEFAULT nextval('public.riderainout_rainout_id_seq'::regclass);
 E   ALTER TABLE public.riderainout ALTER COLUMN rainout_id DROP DEFAULT;
       public          postgres    false    220    221    221            �           2604    16670    rideusage usage_id    DEFAULT     x   ALTER TABLE ONLY public.rideusage ALTER COLUMN usage_id SET DEFAULT nextval('public.rideusage_usage_id_seq'::regclass);
 A   ALTER TABLE public.rideusage ALTER COLUMN usage_id DROP DEFAULT;
       public          postgres    false    217    216    217            �           2604    16576    useraccount account_id    DEFAULT     �   ALTER TABLE ONLY public.useraccount ALTER COLUMN account_id SET DEFAULT nextval('public.useraccount_account_id_seq'::regclass);
 E   ALTER TABLE public.useraccount ALTER COLUMN account_id DROP DEFAULT;
       public          postgres    false    202    203    203            c          0    16618    attendantassignment 
   TABLE DATA           [   COPY public.attendantassignment (assignment_id, attendant_id, assignment_type) FROM stdin;
    public          postgres    false    211   �{       a          0    16606 
   attraction 
   TABLE DATA           �   COPY public.attraction (attraction_id, name, description, location, rainedout, age_restriction, picture, archived, attendant_id) FROM stdin;
    public          postgres    false    209   1|       o          0    16721    attractionrainout 
   TABLE DATA           d   COPY public.attractionrainout (rainout_id, attraction_id, date_rainedout, attendant_id) FROM stdin;
    public          postgres    false    223   �}       k          0    16687    attractionvisit 
   TABLE DATA           j   COPY public.attractionvisit (visit_id, attraction_id, customer_id, date_visited, visit_count) FROM stdin;
    public          postgres    false    219   �       ]          0    16581    customerinfo 
   TABLE DATA           I   COPY public.customerinfo (info_id, customer_id, dob, height) FROM stdin;
    public          postgres    false    205   J�       e          0    16631 	   entrypass 
   TABLE DATA           N   COPY public.entrypass (entrypass_id, customer_id, time_purchased) FROM stdin;
    public          postgres    false    213   g�       _          0    16594    ride 
   TABLE DATA           �   COPY public.ride (ride_id, name, description, location, broken, rainedout, age_restriction, height_restriction, picture, archived, attendant_id) FROM stdin;
    public          postgres    false    207   �      g          0    16645    ridebreakdowns 
   TABLE DATA           �   COPY public.ridebreakdowns (breakdown_id, ride_id, maintainer_id, breakdown_date, breakdown_description, attendant_id) FROM stdin;
    public          postgres    false    215   �      m          0    16707    riderainout 
   TABLE DATA           X   COPY public.riderainout (rainout_id, ride_id, date_rainedout, attendant_id) FROM stdin;
    public          postgres    false    221   *      i          0    16667 	   rideusage 
   TABLE DATA           [   COPY public.rideusage (usage_id, customer_id, ride_id, date_used, usage_count) FROM stdin;
    public          postgres    false    217   �,      [          0    16573    useraccount 
   TABLE DATA           d   COPY public.useraccount (account_id, first_name, last_name, email, password, user_type) FROM stdin;
    public          postgres    false    203   0t      �           0    0 %   attendantassignment_assignment_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.attendantassignment_assignment_id_seq', 32, true);
          public          postgres    false    210            �           0    0    attraction_attraction_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.attraction_attraction_id_seq', 12, true);
          public          postgres    false    208            �           0    0     attractionrainout_rainout_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.attractionrainout_rainout_id_seq', 153, true);
          public          postgres    false    222            �           0    0    attractionvisit_visit_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.attractionvisit_visit_id_seq', 3001, true);
          public          postgres    false    218            �           0    0    customerinfo_info_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.customerinfo_info_id_seq', 1, false);
          public          postgres    false    204            �           0    0    entrypass_entrypass_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.entrypass_entrypass_id_seq', 5006, true);
          public          postgres    false    212            �           0    0    ride_ride_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.ride_ride_id_seq', 13, true);
          public          postgres    false    206            �           0    0    ridebreakdowns_breakdown_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.ridebreakdowns_breakdown_id_seq', 1039, true);
          public          postgres    false    214            �           0    0    riderainout_rainout_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.riderainout_rainout_id_seq', 209, true);
          public          postgres    false    220            �           0    0    rideusage_usage_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.rideusage_usage_id_seq', 3040, true);
          public          postgres    false    216            �           0    0    useraccount_account_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.useraccount_account_id_seq', 54, true);
          public          postgres    false    202            �           2606    16623 ,   attendantassignment attendantassignment_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.attendantassignment
    ADD CONSTRAINT attendantassignment_pkey PRIMARY KEY (assignment_id);
 V   ALTER TABLE ONLY public.attendantassignment DROP CONSTRAINT attendantassignment_pkey;
       public            postgres    false    211            �           2606    16615    attraction attraction_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.attraction
    ADD CONSTRAINT attraction_pkey PRIMARY KEY (attraction_id);
 D   ALTER TABLE ONLY public.attraction DROP CONSTRAINT attraction_pkey;
       public            postgres    false    209            �           2606    16727 (   attractionrainout attractionrainout_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.attractionrainout
    ADD CONSTRAINT attractionrainout_pkey PRIMARY KEY (rainout_id);
 R   ALTER TABLE ONLY public.attractionrainout DROP CONSTRAINT attractionrainout_pkey;
       public            postgres    false    223            �           2606    16694 $   attractionvisit attractionvisit_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.attractionvisit
    ADD CONSTRAINT attractionvisit_pkey PRIMARY KEY (visit_id);
 N   ALTER TABLE ONLY public.attractionvisit DROP CONSTRAINT attractionvisit_pkey;
       public            postgres    false    219            �           2606    16586    customerinfo customerinfo_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.customerinfo
    ADD CONSTRAINT customerinfo_pkey PRIMARY KEY (info_id);
 H   ALTER TABLE ONLY public.customerinfo DROP CONSTRAINT customerinfo_pkey;
       public            postgres    false    205            �           2606    16637    entrypass entrypass_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.entrypass
    ADD CONSTRAINT entrypass_pkey PRIMARY KEY (entrypass_id);
 B   ALTER TABLE ONLY public.entrypass DROP CONSTRAINT entrypass_pkey;
       public            postgres    false    213            �           2606    16603    ride ride_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.ride
    ADD CONSTRAINT ride_pkey PRIMARY KEY (ride_id);
 8   ALTER TABLE ONLY public.ride DROP CONSTRAINT ride_pkey;
       public            postgres    false    207            �           2606    16654 "   ridebreakdowns ridebreakdowns_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.ridebreakdowns
    ADD CONSTRAINT ridebreakdowns_pkey PRIMARY KEY (breakdown_id);
 L   ALTER TABLE ONLY public.ridebreakdowns DROP CONSTRAINT ridebreakdowns_pkey;
       public            postgres    false    215            �           2606    16713    riderainout riderainout_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.riderainout
    ADD CONSTRAINT riderainout_pkey PRIMARY KEY (rainout_id);
 F   ALTER TABLE ONLY public.riderainout DROP CONSTRAINT riderainout_pkey;
       public            postgres    false    221            �           2606    16674    rideusage rideusage_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.rideusage
    ADD CONSTRAINT rideusage_pkey PRIMARY KEY (usage_id);
 B   ALTER TABLE ONLY public.rideusage DROP CONSTRAINT rideusage_pkey;
       public            postgres    false    217            �           2606    16578    useraccount useraccount_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.useraccount
    ADD CONSTRAINT useraccount_pkey PRIMARY KEY (account_id);
 F   ALTER TABLE ONLY public.useraccount DROP CONSTRAINT useraccount_pkey;
       public            postgres    false    203            �           2620    16735    useraccount new_attendant    TRIGGER     �   CREATE TRIGGER new_attendant AFTER INSERT ON public.useraccount FOR EACH ROW EXECUTE FUNCTION public.attendant_notify_manager();
 2   DROP TRIGGER new_attendant ON public.useraccount;
       public          postgres    false    203    224            �           2620    16737    ridebreakdowns ride_fixed    TRIGGER     �   CREATE TRIGGER ride_fixed AFTER UPDATE ON public.ridebreakdowns FOR EACH ROW EXECUTE FUNCTION public.maintainer_notify_attendant();
 2   DROP TRIGGER ride_fixed ON public.ridebreakdowns;
       public          postgres    false    215    225            �           2606    16624 9   attendantassignment attendantassignment_attendant_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attendantassignment
    ADD CONSTRAINT attendantassignment_attendant_id_fkey FOREIGN KEY (attendant_id) REFERENCES public.useraccount(account_id);
 c   ALTER TABLE ONLY public.attendantassignment DROP CONSTRAINT attendantassignment_attendant_id_fkey;
       public          postgres    false    203    211    3770            �           2606    16728 6   attractionrainout attractionrainout_attraction_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attractionrainout
    ADD CONSTRAINT attractionrainout_attraction_id_fkey FOREIGN KEY (attraction_id) REFERENCES public.attraction(attraction_id);
 `   ALTER TABLE ONLY public.attractionrainout DROP CONSTRAINT attractionrainout_attraction_id_fkey;
       public          postgres    false    223    3776    209            �           2606    16695 2   attractionvisit attractionvisit_attraction_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attractionvisit
    ADD CONSTRAINT attractionvisit_attraction_id_fkey FOREIGN KEY (attraction_id) REFERENCES public.attraction(attraction_id);
 \   ALTER TABLE ONLY public.attractionvisit DROP CONSTRAINT attractionvisit_attraction_id_fkey;
       public          postgres    false    209    3776    219            �           2606    16700 0   attractionvisit attractionvisit_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attractionvisit
    ADD CONSTRAINT attractionvisit_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.useraccount(account_id);
 Z   ALTER TABLE ONLY public.attractionvisit DROP CONSTRAINT attractionvisit_customer_id_fkey;
       public          postgres    false    219    203    3770            �           2606    16587 *   customerinfo customerinfo_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customerinfo
    ADD CONSTRAINT customerinfo_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.useraccount(account_id);
 T   ALTER TABLE ONLY public.customerinfo DROP CONSTRAINT customerinfo_customer_id_fkey;
       public          postgres    false    205    203    3770            �           2606    16638 $   entrypass entrypass_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.entrypass
    ADD CONSTRAINT entrypass_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.useraccount(account_id);
 N   ALTER TABLE ONLY public.entrypass DROP CONSTRAINT entrypass_customer_id_fkey;
       public          postgres    false    3770    203    213            �           2606    16660 0   ridebreakdowns ridebreakdowns_maintainer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ridebreakdowns
    ADD CONSTRAINT ridebreakdowns_maintainer_id_fkey FOREIGN KEY (maintainer_id) REFERENCES public.useraccount(account_id);
 Z   ALTER TABLE ONLY public.ridebreakdowns DROP CONSTRAINT ridebreakdowns_maintainer_id_fkey;
       public          postgres    false    215    3770    203            �           2606    16655 *   ridebreakdowns ridebreakdowns_ride_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ridebreakdowns
    ADD CONSTRAINT ridebreakdowns_ride_id_fkey FOREIGN KEY (ride_id) REFERENCES public.ride(ride_id);
 T   ALTER TABLE ONLY public.ridebreakdowns DROP CONSTRAINT ridebreakdowns_ride_id_fkey;
       public          postgres    false    207    3774    215            �           2606    16714 $   riderainout riderainout_ride_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.riderainout
    ADD CONSTRAINT riderainout_ride_id_fkey FOREIGN KEY (ride_id) REFERENCES public.ride(ride_id);
 N   ALTER TABLE ONLY public.riderainout DROP CONSTRAINT riderainout_ride_id_fkey;
       public          postgres    false    3774    207    221            �           2606    16675 $   rideusage rideusage_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.rideusage
    ADD CONSTRAINT rideusage_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.useraccount(account_id);
 N   ALTER TABLE ONLY public.rideusage DROP CONSTRAINT rideusage_customer_id_fkey;
       public          postgres    false    203    3770    217            �           2606    16680     rideusage rideusage_ride_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.rideusage
    ADD CONSTRAINT rideusage_ride_id_fkey FOREIGN KEY (ride_id) REFERENCES public.ride(ride_id);
 J   ALTER TABLE ONLY public.rideusage DROP CONSTRAINT rideusage_ride_id_fkey;
       public          postgres    false    217    207    3774            c   <   x�32�41�L,))JL.����2��4��,�LI�2��41�0�8M��L#NSc3F��� :�      a   Z  x���?o�0�g�S�R����FE)R����DLp��(6�~��(�i;X�-���;F���Һ!fg�$��ّ��=L'F��>K��EӈR:�V��,����(��C�~m^��,�.�h��wb��d-ϰ��2���P�3�Q�LY������N�� ��,��y�%d�GeE	K}4�cϥQ�FUB���³TU����ҭ,q�ǜE4��̼�<�S�taV���t)�O%� �.���q4L��s��P�Z��%�`.ڃS�˶�m7-�'t �2�@F��frB���
}���G;�� �R��1yA#Z(���r�
?����Hʳ(�������}��      o   q  x�m�[n,!D�a/}�y���1��-��h�ax6Gɒ���`��Yi���F��d��;��!����*}�&X��}��U������L�#�sf���}ky{��!h�f��7��7��^;�Zh��1�ց��Ϭv�Ǻ0zF��Ə_'�{�;׼Q��{���D��0~����C��zO��}�d���V��B^��Vb��oǞ��B!+��;���~WB��3v{���7j�C��������������{��hv%<��{��Y3�o�υl�귵>��ڸ��jo�v�"�c� �w�X�.Jw,v�s�Qs)�z�U�Q�>�}���̥^�?oZ'�y�s皟��c[Dɍ��!ܨ����U/x����}�u���Lled+3[���6��1���mLmcjSۘ���6��1����Lmgj;Sۙ���v��3����L�`jS;�����v0���L�`jS;����N�v2����L�dj'S;����B[sap!L.�х0����B_H`�P��w#�F���7�od�H����(��H��h����������������(��H��h�������������������9� a��v      k      x�m}W�-���w��H������Nd2#XgT�,6��ȄBy�x���W����O}f4������mG����Ԟ��i*�I�������&�O~���ϛ�?���߄���i��o��6��#I�&v�����4�r�!򬧿_������'b������G�[��~�7���;ߕ�Xo��W崍�x�ݑ����/��]=m���o~e�o��/[��I�7|�g�Tr컿]���ߜa��x��
k�3�/|?~����w�vv�����)8Y�����\�����z�k{��@�����Z~�h�Q��&��z~[�ճ��0�������7�_�!��N�����ki߀?Z����念��������ٞ��o�匷[0�6��B>g�In��H��@?��ѭ����ׯ�F�6��x��[�!�6α}��g.�%���$6?̳޶��������sH]�~�g.��G�v�>�mkN佁(��;��:&���6���߯m¹��~���1M�ς�2�7�����y&����8�����տQa��)�����g!�թc���nz��ӿ��=�x꿶�"����%����yV��Ių �CZ�e_��~-��y�$j'v�#'� yW���;����I�����l�dҲ�CZ@n��ܲ��f�����U���?���i�o��2�S~m#e��f=��II��~��vHkm��!{�au$����B�at���6�'Tm��������M����[q��_������r�,xn a)�D��HQ���*�-ľIU���4*�i�L
�D=����҈�dZc�ê��RK�a����OJY����9)��R���g��>~�?\�S�z�����@�(G���/�%˜�#��|KM�c���@��L,*�~0e/�s�5�(Z�%���Q�6���+��6O+(6�c�W�85U�yO��TR��9�O֫�Ӵ~��aZ�J�M??� [ĩQL�Ê��N�?��jJm�y8FL�Cc3|�vh�� 	RG�̏A�Η�;�߯T��h��C ?乴�s2�\Jp�� �eC����b0 䲏��8�4k<j�C�&q����N��ζR�'�Ɲ�w���@�-vAIP]�I��>Q�=
`lZ�F�Am��#ӷ �}���tf5�ԡ��Wx��5��7�7���P�
��
�H�=�Մ�ly��(���$r��~@��pL@X�vc�$Z��[��!S�ǐ8��~'j�7T�:B��ċ>�|�QC	<9Fȯ�E�9��2� ���!s&/�~��#����>���h^�@O�Ө��|J���h��~5�S*��a��a��T�1�B]���VW'<���Sb�LmGwa�y(K��ۚz�i�4+����p�����8�|i ��
dO&f���ƴ����F��g:H��x��� G%{֤f?31KK[9e���S�6���:e���<fj�n_y�yZO4�C5�:O�*�t�m�fn+�6qD�]��sü��V�y'�o�J�QP��$�а��cF�xS٠�[Lj��o���%��m���m[o��F�g�Ѹ)l�ga ����c�0�<?7Z`���h���7�1�����W�x��*IA3��VR�jg\);�ڊ���&���`�?w�F�@aa3j]l��[��ח�m/�%{�Fa�޾��!�m'�*�g�,m��-��4v�C�9�bN/j�D�| $�����5�t�,�Y��4)述������6����l�t�ڇPі�>Yܚp����Ft*�[�:�;w!3�����B��GX�gg�7b�ƒ��=c�GԜ���D�5��޼|�9M!���5���N̎�a3����j:;�����u�ѽ����x�s3xO���Gw�u���o���D�����.eo�Mi�3Q��E��!����;�{g��*;�u�M�?�B�RCܮ͠���<(`��-����?��Y����.�f�X,���i�Ŀ4R�%t�m��������d�M��p��R�?b�^�>��7�pAn2$}�Oc���y,ڿ��'֠S-���?��x�ά�j��C>;�x9B	TQTA�� �Yj����\���&.Ȫ��`y��U.�g���!�??��Q���=L\�iv�y�^�;���4�����F�OW-�@8�7)�_s��$miJ��"�\�ϯ�{�}�>1�V?\.�Z��;��\�d������yH�������ռ~0�W+�$���k���-��jC�:�6�U��kS�s��Va�t����cv i���C�����w�	��ҽw�0���f5�÷ˆ&k�E?$FP�4V�Nj���U;���{G�Kk*�"v�}"�w�׾@�Dt��[����KLuv�Z��Qg���ϴ�O#/�L�j�z/��3��'�<�.&�?�����i�ndy��uދ��OeQl"�ADR�y �%e3���(w�[�>�:_D^^�c��,����|��3p�������ԥapR[<�a�ׅk��w.�{~�kP���o]�R�q���v�,���%amKva��d��֔��`+�o�ݮ��u7�.���l��9 �F����ɘo��M=ZCqM�_+�q�(k�1�p�Fe�?_j�|�m$#m��P :u���o��Z��(:=숸no�UЋ^-l\@�W�e�����c�PD�mL`�.kl�|�� ��-���7aG�	�&�b�L�\i�t�����Bh惀�<�������h8���*/�K�\i
��Aʄv����t^�7�,��}��
~����p��*w���T
���J�ŏ��Af����V;�o���a���8(lu19l�І��X�b_f��L6fS�k��D� F�C>]j�l��2����ȴHk��]5���m�3��:[�t��9�B�
�a�S�I~�"���Cz�(n���!� ���8�f�'	Q����i�?���H�2�q�a�6�2ý�%��h�R��o�h�P�v0:%N# ��1���60YCB4�5�-u��.`�L� �i1���`�HmVR���n��P�D@(R�I�W�Dٜ�o�2~��V�Kw �nZ`��f%܄�/-�_�H�2�6��� r[�B��b�W���� �L*Zo�L^gj[���� ��љ�"��>��WT�o_�����ߴ�Tʧge8�m�3��������mO��wJ��\�7pXf,$�ș녘I\���L��d>����󽠯(�>z� �CY��q�.{����v�XHa�C�]GWvC �-��=8�[ �~�r������%^�M�tH��~?�E�%u
����䂨�?�l8�;�����' ���z�V�y��!�;�ص�hB]_?ч��af����'aA�������_���'0�9 �8:J�W��W3.zE�k��^+�:"Z�k�	U�+z]��-���7�NF9vJu�	%�nʟ0��[��璚 x��{S~�5��lw�tsA���{��RZg�AӢT�2!+�o��M�K<u>�9fj���^J^�}�"��7��JjA���M����\��u{�n$RON�`�iG�'ЁZ�9  �A���ȸ5�Sj��@�?Ql�����v7� �`Z�N>��|�uc���|`&Q�%�@�~�>������*I�� �Aa����Okc���;-�}}�5D�0��vy.���D=�E}����}	�io���0��J��%�y(��LK�$�;�(�#5�[ c�.��+�d���N�/�< �{n!y뻼���4��_�����s�i%s�;�U�����'o��g����q���	�f�^|�$��[���p��}(_�q��r�5��D���R�d?ʋ�r�N����匹O�me��$B��nG��h=��#::��L���p���i�Ъ_��^� >�<�:yZ'�QyyI�t�!�l(S���D��C�C����𡊚Z��-��W�n�{�4�����$M<��rT���0tukg(jڸ�1�Kz�7e��q�߇��Я1k�͋��a'>�ʧT;��g�[������fs�bX�h#˝���_c+�ђF�����Q)��\��nP�    ͍��ߨѩ�Q�ndT�68��m�Iy/�ZG[�E��ۆ�CqKo�7�$jء��?����{և<&;������X���XQb�:�8*���9޸�ʇ	�A���C 'D(q%'��]��??�X��`Wk�{|�ȥ�_�����������)*cҒ�"�����1/��1ì���������'�Ͽ�E.��~�j1�6'�c�I�6՘9�쏱09{.��#���+�q�ׁ\�lԱȱ��~�N`�Yc@/�cNHW�wX�.9�b[��+��>"_�Cy��c#�+n��u�[�n�3s^�w|����e*�A'Ȭ��ƴ��`86qs$M�[�C�YЪ����^s��R�'`y��K�����s�C���3��2I�-�>| m��\�̭)��������� >�m��}q�eZ�=�v�I���)#4=f��]j=YA/�g	:2k�u��˧�?@����Y}MZ!k)��4� ��f_ꔯ���'�on��u��7y���i�!5�+a��t�Y��K�h?��Iا绢I�������)�։���/k��O\�v�����s��̆�Q��T:M�~�(���>�'a�� n�u`����]1��s��^��}[^]�-ixJ��oƚb�]������!m�ye�~l�ٯ�vJv�}�A�J�������9��e������fgY�.Y�]$==Y����I�Xv���EL����u��6��զ�:f���96��sݼ�vm���o,�Z�h������>��- N���k��8)9*0�eVʼ��g'ݹ��e�i���B�31� Yh�8S�#3W%�7]=-6�Xl���f��9~z���.��� i?���śC��1V����{�Y�Ӽ�a���o�mW/�@l�6�%u��ܘ�[��Hy�f�戺�Ҿ<��[彛�r�4�C73��'�xk��S�˲'+�*ם�m��߶y�	�"�a��`;�?\���t�%W���%����T��"[~	z��%��M���%����&\�`v�z������.y�@yo.-���� �����ɆS:=�CU
l����#�,t������N�����+�/n��u�7K}U��գ��x����_W�W}���r��yN�� �F�uxq��Ip����E� �)�?�ޚ�!c%Cj6�d5��^�89�[ū5V�F�v��M�Up�k�ڼ��g�o�aʁ��:�j�x��0`mI]ؕeP~u��cq| 7�}�7�6�C�˲')���͋�
���j�#n��e��R�� ��Z���G�-+� �l��V�+�y ��90E �v��5��s�R��\���xU]B�ӽ��9�U�X�{A&�����3��l�6wΚ[������s'�8�]m�����$���֕	:�QxJF��U������&�om�W�pN\<���	��]�Ջt�����H���R��ztH!�Q��iZ���3:�����:�fϤ��;�r�6�w1̽�db�� �P���~��»���������.ʓ���]*�Z�z[�J�?��m~~�]ƃƻʻL��v��>���f����J�F���&*�uQ�XҶ�I8�i�!^�����1����}^�%A&yx,�b�V�[8Ȕ�V�q�{[�'r��������*�^��}źv`�����3���\��)f �؊A���-iB�^E  �ͮJ�c!�me ^��[�i�&jY��j])p����~W���G:mT����V*��N�v����7fC�x@�my��l�r2�O.�i��fN���15�!
-�+���~(KͶ�_�6�.^T���ݕ��Y�d�����n����=�<�Η�M_l�y�<2ox m�c�Y��R�6m�ۜ�ɶ!Cٮ�e�z�A;���y_�dn��98M͘a`d3"a{,V��z"lM��o�+ys�%>Pvɩ��x�3������˨�RD��.GN����@aO�����F��������E�~�O�Á.v���뺟`��8=��0M �×��r>?9^�sZ$�T쵁k�CĽ�kg��a@Ks�[	��v�,��ȗM��}%z�2�����;��0��\(�Ù�~+e+U8��jV�"Z�^V���6�[I����Z��z9��V��ޯ��B{i�R��Y��.�|yu�R6��,�X��T��Kq �#X�>��Y}�J��p�/�xI�"��=����s����p����'E(�:A~0#���1��
}#����>K���m���"O�wqi����z��׭�qc��,%J���|��7w%�k��Њ�:.���E��R����s�h�G����?x!�ko���I�2R�[�D1������ߺ�T�ڐb �N<���$������k�8�Bm�tկ��kA��~���눦��,}���V,mV�k�<dx�S��+N:݉#��\�{Q�cvVb+毀��D�����¨��֊�G���&�����q�uF�r&�	�d�=�{@*��b��>��k��ކ�=. �$ވ��J4�>0ڑ��2�.#[��*UB������J�V�Z'_���Qټ� �5�ʜ|D1�W�IdM�|ym^��7����fɯYY��i,.%�vq>�%+����,B�Vׅ��BY�[oM�$�I��K�?�ĺ�v-�r�k�$l��T����r�*m\���U�
���ɯu=T��E��7 k�!�;��U�+i.ux���U:�k��%9�����k��!����=�+#^ے�Y+�њ$"WF�����ˈ�83k���'YBN����Z�%�����(�*b��~���ADH��E��
.6�9	}�mI���XI�V�oWUD��J��(�WX\�����"zE�}�V���uT��H/�ʺ�ϳ��^
���ڭ/�4�"�P 긽�$��jP�J��auro����&ƴ�$� E��<�/�"@�IW�m�����OC-ƣ���M��dM�S��Xq�"w��$��E)��Q�W�_��>���{@�c�&�H���/��[_�sn�Iǫ�Ce\d�_�r�  �c�nɠ�u�5[�K�tn���[�Q.Z䋮|^����gO]L��ENaL^kT� 8�
�w�y4O.2L�TǼt��I���˝�}\D(-�9��"��}52��9,~��m�S%s��!$>�ƣ�S�Xk��S^WJ��� �V��
���! �v(��Ld�z�ݜ?���r�y9_�(Q$ImcTV̔=J��ފdYSo�e	."vs�R�NA����m��2q���7N����ѩ�7q()���T�
�������i�+9P"D,Z����T
ӵQ�)�IE:�Z���Ho���RY��h.�T0�!2kEe�>8y��⺨`Ѩ�;i ��3�����}$�B���܊9l���
ӂcF�e9�0��>��Du<����\lQ��n�
Mu���B�.�Z}�P�Z�<�Y�/�����#t��5�����&E��������*Q��^��$���THz1U����-K� �Ϫ�_���Mk��C��8#��&�\Q���m���Ƨ�g�FOF�v�^Q'SN�M�E��~�hs�~Jm�?&���\>V닊 �|ȩ�I���I��S�#�n�	�k�W�6'�A�t���$�[1.� �b���q�����Q(t�F��u֓V�Ѕo�e:��^|�-:Q�%x���fZ�}d����8�\�Y
���V���u�#w'���3^Z'���<��I����R���Ϻnu9,�D��x)N�T�M[\iO}���KX���.KxfN9N������[Lm�y�i�������9wy�e���#��\i�_;Ѝ��xaEtc���Q��ˤM�e9�����@�M�\��Wq
s�{ҁZ-�|�#T�'`9��B��w������.���?G��7�*�ȱ�Z�Cn��*���H�x�N����*�#�S��0��`�>Qv�[�Eg��I�L�JEʤ�k��7X+�r��x/�<��{�/ہ��_�)�    PI*���I'g�N��y�v�b\�Vc�hfnV��ˑD/�)����㔨b�;AN�f���ٝ�7#"sL�z'���A�n�o�B����_!�|(��NS�<W<�Z��<^�[	pom��W����'8r�� i�Նk�h�W����[r���J�t�.�k�j�%�#�˃�m��^��3Z+��b�w�E�/go�`��׊����{IO�.f,�d�qoJ4��("��.c�O>�R�	�"t`X�&Y4UK@�:&�.���U��p�����AY�
k�O��|��SH�9L�
2S-��}����_��:�vv�֓:�U�Hȕj��os���!Ͻ��*$6�^��@ɘh]��c��ĺ�a�t����e%���xh�.|d�%��I3�[��YY���\JǷ}�o�V�ˡ7�����T�$�R�o���ڬ�C�n��ݓT��,�4��u8y�O����[��n\7F(�����W�
ʓx�AZ�蜟G+�s��[y��˛�&�{��V�(�|�I
ɩ��P�1��݅�=�ф-:?�&���i�7�e��fz�!��$y���	&��i�&O����T��3���g�_
(�X�?̧(z*�,��~��bt.j�IT��l{�k���#���*�\�d�=+�t��-�l�9��ux��U��^�|P�������xPTZ���yg�A=��,���!(�7~�m����������a�v�C̬}�Y���j�x����e��+��{��x���+>���JR"dG�����7t�o�8�+�����3������\ߙa�Xp����,�tIY(�m����_:��!������:������J�[�6
�xZB�t(l�A�6/5�erx�#�� 
��m�+�3�/�2D5i���	�h�Y��|�,a� ��
�w�V!��`1Q�&�b<��ZTD���[ǋm�c�q�����W�<7�,c-��|Ǐ���C��B#m���G⼠(]���J}���'������t���Ym����;6.�r|c$*�H/��v/���d�^�
�1B�$���^8�������V�TK�^��	/0��e�s�cU&o�`�1�����H�r=�d���*٤�zEy|��A�h�?�(��3�9}3媁3�,�]tt-��n�������b�Fb�����$��W$�y�+gO�sT��F�WWV�q�Ty4��+�]>jyj���Vt�KxVzU�ƌ�Q$�������z//��Eq ^�ޡ�@f����;��Ѯ���V!n�Vt��i�*��ڕ���8��~���M �)���q����h�5Z��,�Q���Ƚc�F����~�⏤�+&S3'
���N�*X�2eӁ�;K�:��;�ǫ��)��>X�j�oZ���e�JxT�ŃN�E�����n�3}\���['��S��,��$�e�8ةQz�gfSH�:���DkZ!�L)Քv93�9^���>��:=�.)O&g[���d�����[]�,'����\����N��@6�ר���"�|Ix�녒��C�B1	�7���ތ��8i�aG'��9�^��#�쫤 ����ʜ�����[ݫ7���92ze5@}�
��*��O#m�BB؁�(ϩ)�?
���1��S�m\f9G�^����(,�����x-Ӎ�&�A�r/��� J@=Di�n,˔�J]ȠL������%��C8��=�|0GKc���z+�q���W���VTs	\��]���C9������`D���)l��%:�WU��m���2O��6E.p��2|	u?̉r��G`�L�D�T��)��Q��x��^�̸�R~B��Mb������υR�v����Ѕ��5r��<�ۅ�g��ɐn���zYy�^z-��Cⱓ_�S0��x�J�h��:���8�0��m�ދѯ ��V�z�����0��VuV�� Jo�����dtD�%R3ǅOܿ8_v����fw�����J���1���z�Ib\�A��̇2-�}�����u���,��X��\`O���I����q�qGy���-+}��>s҄���_<1��.�S�ʄ9�.!)rj��gf��_9�P��V��ڭ�(i*���
B.���q,��{qPJ�/��(KJlk�����佪�1�!��/i�3��us��󹮔X+�d3m~�+���΂Y{��=��Hl�,Jb�}b^%�r!��^��J��M�I�sW2��;��'����t<��'S��B��.S�x�݋S0	8��K��Xk���1�A1�xSY�����*�����<+����sꕴ֫:~��7θ�T�R.o�F;�*x^/��N(�Vv�?as2��W��{�M��j�B0�P1�!�/fE;<�Ĭ�6Ǜ�r������`�����'�ǝyJb�\X��|)7*M����R�N^K�R�����:q^Q�J'=��V~D���4���H?������re3�1��O���<�z8ώ��]Ggp��gvNOw�>;��
���C�}��xх>WW-��w?]\�U��}�˼w6�q٨R&s`�?� 
D��&�y9z�q��Y�`�s�Ƽ�;�]�̿���ff�ׅg$�w�����rO���c]>��A'&r����[ssN&V���y-�L�y�Pb��>��_�P��ױ���g��?���M�i�ua0w_�5����ɏ����_'Q�$���م��c߹�V�?8�t�8�]*B�t���V��d�j����{����sc��u-��]�.f^�*0��ݲ 4�*�k�[t�'=������W$�/��#Aދj��[�<[�;;�%�0���4�3��˲�k��O��3m4F@&˗�&/�Z�тz-aߥ����ՉDKh�pv]��c��FIK�+�R�3e��-֥\9�f}Qp'��,Ŭļ�t�Fr��*�w�b�	Y�ȍ����UzGj��N��ɪoX<ž�0x��;�_\�����W�B�>D��ncE�Vʴ��Wu<Ӌ��݂���u[	����x�-����D,�.�H�K[Gbf�tv!�:'9{c��n��V��J�׽ Г�8��x�3k��F`��?V�����S^���&fv,���F�kY�Nm��}�g��g�v�����E���bq��t���\)�hs�*Dn ���Ac��oN8�[��=3kՇ0���Ł����rfw���a^k�qя���EQ�����bm�5XK\�>���(	��Ez(W̆��9��+��s;k^��4?U���i��2]?k��<��l`_�~���Y[�c�V�c���������;�ʽ�E��[g���f_Q�k{?t�д�.�s��`�	�����r�.��s�T%��.|Gе�.x])^��]�<V	��^�J�:�3�oK!w��c���^��ʈx�u�d�-�w�����y�|;`)��.WX|������,�/S=[/�38�UH��}�U��]�mJ�M0���.��؊!�tUݕ`l�����s���z=#���|�z=��TY�lH�veU�vŮ�D�����Mٕ�vW��#���IZ�^5���w+$Ƀa����)1�g���%�ѰjHT��2Mj�{gE�qzo�ѐ�/
���t��f`sw��'F���Tܝ���7b ^��;1���}�D�V<���;#�'5A��=0��J|�;s�a0�C
߅��q��/x��x�l�Z�%c!w���4\:���B�1�Y.ju"�o�ĕ�3�U���Y�+��F���^��+��h	��'c���J�}����VOP��z{���H��`����/y��`����s��Z�X�����z�*Xfq�8�L:�˃��M�MU��z��l��o��2�aý�nH��&]�el�KM����Ҏ^S�B�6:Q�]�Z
�걙i�}(g���`ڞ�)*���Md�)*K嘏8�R�73:�����Oz��6v�|������P�:X\OQY*.�m�C-��g��+���ST�3����E���k�08�|r=�S�u� -�����o�����9��Uk��->��{��q�����mmT�����NCNi����H�wB=�w'�B��}�    ��#�OOU��˂�Z��w��V�֗��J���\|�xx_OUن�S��S�,-=Ue�]�h]�a|PD����t�35{5�����}V3�噅���'�V���#}=�e�	q�{{ �3s�㦐����E��]I��m�q_������X�=���K
���<hZ��=�6p�����7�h�T�������R�SV��9�������=ee��碧�� M���SV��獡T��|z��b�q��)+�oH���,� ��"]F�=Ue������ST�����籊Omk�45I�����.��uF�|��lx�ab�),KM���AB;�c�t���ZQ^��bo�R���^�#��������{�(.>��-�;9$�SX�5�ߺ^�t1a��)���.ҕ!%֦��wx�ۢAU�[�����|/ζV�J��N�ܝ�A�=���7x��t5�h/ @IܛD�Ӕ�⁳���m �})H���U)���k)����|��Μ(�����>��]�r=U��tB�!�������,NYY��cNYY|��\���0o����s0�w��
��ӎ|o�|�C(���ފ��G�U.��8B�������P0�}�7Rn��>a��|N��47�{K'-n�%J�;�Qv�\x-U��=�Z�o�3�*�@@���R��gLv���H<v�O��챕����*u����7��ڱ�س:\�ǚw
yo�B�����6p,���uKCOY�$Q�@[#F������#�>�������z�u$H��Cf�)U����$suy�y��	x$�}�_*�i�7��B\:b�T/���"�s����|y[߇~?�_OQY�ؾ�q��'\��L�^�[��J�=��^��s�=�t#�+�z���a��E�߭�ST�t��a`I2������T�o	+Q�P����t2�=epy�O*N���q�ÿC󝜋X Wq�	���T�x>;�q�,}!=5e�]���� �[�j���Y,<��l��d˓�g��{�zJ����6�@��.��_�a�7İ	 :��]aő��b؄2���S_����~��=���k�K�}b��(��j)�޾�SQ���D5lB��vZ_�%�eUU{5_��uV�1� �`=%e�C����e:��F	�=5e��Ч�lG��'!����j�L���d����`�� 5q���{x���'�}?Uy]��T�M�A�9��O�%Kys�TY..�j{��0�Qe��ƫ:!#�u���Q%���؀�KH�ST���ʩ*� ?������j��3���o�D�Z�ե��&1��[h�wAK�D]L(�u���D<UeQ�X�O�	q�c�SU��K�6��p<Ue	�W�2�7qS6kC��&��E�(��m�\>���\�X��'����
�3�>�8Co�r�eޓ�4e��	"Ɲ�/����W���q'�<��{6ޗ5���P5ti�NR���*Xc4ZE��D�ي�+*b�(������	��V?�	8Zt"됊S���d!�Yk}���1ѥ��z*ʒ�m��T�E��֯ޏ�������i��=/������$�-%�A��U�x�,��BWs��U��Z���N8�m�'訚b�!}���� �
e���:�-�	�}c� ���({y���v#��l��\�~F�;����f_�E��T�%E�v�76�Z��w���vҮ9%e	O���\Vkm<	��������:�d.�OEYr	G��{�x����˶吏,"5�kN=Y�9®���/..��'�a�bm�)!��w`Ӣ�}��D����d.�a_{-�ڪ��ڭ��h���U�Vj~M�ע��h��+���_�O "U�'��u��%M�SM���ɵ�z@�d�N�������<���+ǩ&�	��j�j�;H�;��:�]���}')Ak��a�ܩ�;���&8D��j脲�3�������[p�I�m��q}v�ɢ^w!\ۂӈ�+���m ���:�JM�2tBE�/��R#�^㱊~�f���9�䫰��T��I�Š)C'��n!���jO�q�q�<�ǖ;�dQ!�	�J�gl��v�$��,�y�_0B	U��ғϥ|���a�q���C��wԃFu
�f�)(�/�;���5�d9i���19""��|?�s>�9��xtQ6@��v`\g�UH���p>߅�������C�b1��Jo�<{��N�k�pC]������9��k�<h[�P3�	UK�Vͯ���dKV��������f�W�C�=e) �l�9��Υ�/_��[#�I��V�_�z�<I㵕�ڨz�N������Z�8^8�d�nt�<�d1�,1.;c����n*7�(�6�yO>ׇD\[�,�f���������9�d	�T�ɓ�>�MPDqsm�y&�O5YzU�诙�R���~)��7s��H�s#GI�Y9T��䔓��C�P��f��$�yzpJ"�qP�I�
�� u�b�$I��?�S��dD,�v�qK��A"�C��;)ІX$�;5�Pn��a<5�kk���=iܡ��6B�]�ȩ'�9�[��O@�N�;صhFk�wj�`�;`��O�\v����P�&KiJΊ]�+��̬W3.Y[o [���_3<M�IQ)��5����rL��n"�`K>!�a�k��#��XJ��F�L�jkR۟j�d\9]�'�b��N��Zp��љ��A�������W�m�,��&K���/���k��. �MK��ɼ��7Hጻ�j����[���(��KH���-%9�^��*�VZ�f�@��;���	&�̓��5a�Ӗkk���Z���8Cۅ��M�SM��c��1��N��	��s�Н�35�'p������	^��32�B�Ć@Y���)'K98Fi������{I��^0̟v�&K�O�}�{��\/�ǲD��F����?�d7�	P�Q7�ঝ�����T��2���rO�E]^+<[���������7o���,�.��Z�͜�#X��B
�Va�nt�-�s�<v� IYP��'y��ibwt�,�>�|�"�s�rcSI���`w��땭�Wg\���w�RO�4��6>!�R��4qOj�T���N�o����L�+5��f�!�ٷ	y���^)�{�|(�N�u�l��RH�6�+zks��s�h��s�y��R��O�_19wZ��ɣn�:����H�)$�Np?|�=!�}dt1dH�w̫)��z��"^��J��Ur��~[ĢGy�f��!����Qt'�N7xW��5�+O�e"�SH�6�x+���"����5�V�'�1�ݹ
,h���&�{���[x����وmC���`b���>������D��ɖjN�3kBά?GwV�(�7Sk�B��Q���Bt�:<����q�4k�N��8օ�a��#,f0?��)ۙ���������l�觔,��8�+��E�FgsKž�e�vB�hdV�)$��XK�^$��9-v}6�\��B�wlƚ���S��$�Y��iEC�F�~G_}�K����'p�������SH��mڰ�;03_���LD6���CP�e�wG���� Q&V2xꭈ��<��(��!�%	?e�A�a�2'ϸ�>�������`>���:���̓�O�&Q��MӚ��W% Ѩ&p�?���tx0*'1x�`T�T�̃��Oz�F�`x޲W��E�)%����)%K�v1�};�θQ(�֚Q��KmX|�C1�w�@���>I�1ڛES��;i���h�X�a�}\����zF�MP���SJ��ˉ��m@���c�;nGA���xJ����}�e������ֺ���@A2�d���/�c�7[/=6��JO���m�����!� ��]G�csy���e��i{\����N���S�L|��S��T�%O>�C�*()�'fۗ���9�c���WP����sZ[��8�AN-Y�����4�o�p?٩%K!��<�՝�����!�0rP���})�2J!�%KAc����M����v��J-8۶�w�M�����N�?���w�s��*)�c�2��<�d/ϓ��7� 
  D���r&��;�P��zZ���YnM�}��P]ú�e>t�s��08��Ͳo~>3�(O��x
Z�~�)���<!GV>�ݔ�2H�kw�Q�T��K�vyRg���$�dls2C�ݗ��x���;<��{�:�a}�Kd�Y_�Ei��A�S�3&��@:S'���^t�.��}�ص��Õ�>�<������Cq���O?�K<�35^*�`
���_o������u
�~�E���E7!'Ey^�jJ���l�e�lY(�b��j(��w�s��F�)'K grJCI+k6v��L�8��g��"�����1����Ft���R{L���V��G]L���U���[6aé&�v���SM���y���/�pLj���s�ݫ��J��km�/7H�=Wν��a����nV��:/{հ��|n�ꚓ�^�95'�Lў�3f7g��[c��E�~k��^!�� *���d�sX�F�@}.L�J��� ��9,��D�v��s��;Wg��g�0�+c&s�)�y��,��'��\�:���>�s��x�M���
��i �m��~˄����b�M�ص}��Vt̖0��F���c@���s@�d�[���;�U0u;��*h*s�V��(��eN�zZ�J%r��|0���y.��6)��ח"��W���gz�*��F��
'���Z�)�i�.y�@�K�~R�K-�4�gS,� �n�/���*���J�9�Z�,�ʉ�nr/�dļ������7=-�eA0�|wt>���.�Y�a?����Z��������N���s݅���p�A�*��q� %��5d�QX��=�o�dF�8X׆+W㻜�V�K��^�����ϐ{�F �m��hu-$�@O�*��\��"9�F�j4N�p�B�ֱ��W*��J�⾶�1V�^��/ߞ�1V�*M�Z���}�[�x}Q�{	Vߤb��\s�"JK�1�T�#��Ey����y_������A�*�#e4fd��[o�B[�J<��F�Kd��OL#�;�kr5�XO����kru��K�.�'_���n�>�|׃7��'' ;�\���\P-�{e)Z:l����V	/<�ZX�+s:��yut�c(i��j'�\�������dmWx ��G��RX)z�Fl�ٗ�W�ݙ������/Or}WxJ��U��ڻ��~�W}���`��,��d��
ݖ"��Q�\��G@�Q�}]�q���{r_��1s�a�
�=���s݊8s����v)��x�(�e�y��	�Y�u����z��p���m�B���q�T:[����������k+_Ruܾ�#�qB���(x+ۨ��z�m�;�4K�ז�V���b��%w��Aм�����������,�^�����N�A��]���+���UNג��4IQ��ܲ`WL�.9B+̝>Bc{��n(Mҳ�[�9�3~��O|������n|$X�qnsNY�%�[����z>��U'�.x�-���]	�>[0Ro��{�-T�V �N�}p����!3��W���=��\֠���4	��::_�@#<q�W����a�3i#�{P6b�=փ�Mn^�/G6��b��O�d���
(��m�W�;��lD+����"f�o��#�����w��yP��i{n�qx�<���0iD�`�^\n­ݽ*��`�G��b_�<�Nlk��	mk
)Y�E�ܱ��g�}�S�~fj�3�f�;���d�DI��,����WU�����_�K�n��x�[1/=�t-���2�^Kys�%bO��������/b      ]      x������ � �      e      x�}�ۑ�8ڬ��+�=A ����ߎ]l������]	�Eq�v]��������w��������v]�v�a����ߊ����w���3���/~���A���{��[�A_���A=��_�?�[ľ����+��a���\����_�"�m�g��h_��b�k���+�?��]�+�3��sըA��y-_WF<z����e��c*v�J�_We�����,�٣����߯��_䎾�"9�.We�����U��[�,���_�Y�k&ͫT^X��W��A����Yr}����ɤ_��/�z�x+:?�=����C����;�=�ʽ|~W���N��xh�|,~d������<K42=���J�����e�G��{��n��������G+AY���X���);�)5�����#�cԤ��2~���دZ�D���ǽN���;��(��1�w�?����"����z�H�����Y��Q���Rs�b;s�\�I�G�ϟ�h�_<X����S�Y`5��V/�G橥�a*�\>�|�k�����3��*%D�ol���q�)�b�⾾_��������������*/:K��ں�:s��i�+۳�y�U�b������W�"�c���#��N�g�贚T���\�?��֟�qm�U�\y~�g��[���j%)uv�N�x���/2�W���q����wA�(f���R(�k���j�D���f�(�9>���U�g�����(u����_��]��,e�¢�gn���yY4K�&hM%���Қ�����ڠ���Y���]
������h�<����f�O�5Z2��U���W��c�35K�'��׆��Q�9�����g��K�z\uJ՝������YZ���8��G�L?e�M�TsG�^�a�Z4nֳ�hZ�%�}���.�w��)�@����ZkF�j�oӽ<Y��v�ϓe��.-�;b�Q2wG_�ҟfd}^�1|&�W��'���վڥ���1����s����%���C�E�FuT��4K[�bm���-;m`��]j��U��}��*��E�l%����\���T��[)��G/�}5K����Ĕ���q�]*�����c]�K��n[����+*�x��j�9�Z��5g�(=�|�kF��7�ViFq��E�j�ڵ��I�[���N}����ݵג�Xe�V�M����[��L�L�O�^E�Z�f�>�v$2��pM;*��ʥ陉XZ���I�V��^�|��g�<�'�Ω���~]�	�����J��U��R�}d��W�b��xX����.�������ڵ8�؟�ň{�����zo���(�zm�>ӣ��12��i#{�6jS�4k_2p�!���Պ6�[/�����e�譔oQ!�^��Q��ژ��ꦑ��Gɿ��z�Z2k���Gk��]�GЩ�k�P��(I�5s�z)U��銡��~d��2'*��b,$>����2B�i�UG�"��j��ٽT�Q�w����]g������5K��Z��j���S����$ͷr�^�ZF/�	��~�JK �y��b~#f����G�y����}���B}�R�F;�O�\�e���Q|5Lz���S��_٬-�GP���s�Y��H����׿�?�X&�<�ͦg!��2ۖ�j�R�<�z}�H���Չ�Z.���Z֨=�H�5�U�{�NK4���4A��`���K��?��j��R���8���˫|Dc�k�{ַ	�s�)�y�z�:�#���d�E'.����#+��,��p�j���>���,}���R�f��x��S���/������A?���֛�^��Q
�͚�uK�x��ef�,��#h�zlGЮ�X>ء6��E�mj�O��k�3��T�."�EI�W�.��јu,$��~�{���f��,��^�W����G�hwDj�N� ꪏ��18�A1+���GP�FF��J�uj�~a�Vi�/�:F�ߊjQ�QT���W�lw�kQ����Ȭ��dZ%7���9���/c��2]�eGtu�N�LYu0��.\�U��Y��y�U"�Y�w���1[,nԸ�O����E��k�+^�͎�0��A$ԈԈȏY���7��gj������P�\��l�F���ftY"�M�шƬ͎|)s�F�p��Q���X韣?�K���H�u��!k�U{��̫㤯�j��\�,�j=��b�K��ZQ��+[��v3�ס~��O��1��h���^�@�b�"��fuATf�=��n^�k<2"��w���]k�H�}hx^�6ӳ�=�&�u�n��E���j��� ��ԉ��/�:��q���Wm����B}2_W�/���ayU�z�	���KC�ʠ:���5˰Ad_�N0eЮ9?�UW5D�w��Q����U؍sS^D26ױ�A��4oV�K��s[�����R����)���\�c߽����9��Q�W���T��V���Sެ�j�r�=G�2"��U�/��6*���H�G�4_���V�{����ʴFm?��fǪ̑UFs2�NN>~��hDR�*#�Qۭ~d���L�XA�A.�h��=j#�xF}�#��?2}���G�ʎٖH�q�q��רɑE��u`&�y��I��(���=�1�|PF~�"'�����~г����1kc,sی5@��M�Y��ei���8}~�s��-�~�lK$��%Q��橱�˲u��t5Z������:��u��eEݒ?8�t�ǪS�Y��]3U�`���wM�:��/#��y���a�p����[�u�0�pGI�k�2�������U\d�S�DCݧ�B6^��yk��f&ԉ�yը3�yU̄:��7E8�o���}�q]���h��jS1/�Q�Rt�V����u�$���3�V�9�Ĳt\5=���N�e�[]/�t�Z�d�j_-�\g#۠����1\4+5�.�G�G���Ȋ�_5�3�N�ej�^�vİ,.}���ǒ��|u\抠Y�7�?׮�X�����̦�z�CQ��U��HĽj��1h7�M�/��x�x̺�"�ZT��5���D�;����>��7|��kK�����FY[�,��#9"xҬ��l$�wT�<%}��j��d�̿��u~�ת/�kԕ���G�f3�c�R*��ㅍU�t3u�#ˢQ{�Y��F�3'�����\]���#@#Z�W�m`�7'~Hs�h�UY��S��"���dV\��#Z2c�:��_��%�\�Nd�5�LFΥQ�L��j�Ϋ��,WV���{_u�<��;�Cڱ�'j׉�����)sǎ���`{��(�w�����v��|���U���3w�Fcy����Y��Q���N]����A��L�I����pvM��3q�2�u��hEP�-�A�~b3�D���"w��2�X0�#(Fӯ�l� ���RGP]��A�«Z+K���ե�VbW��k/3q�/Ƌi�T���u�f�e�!���N���M���G�����|:{n�0ђ��ke���1�?;&#{|�����}S�>�T���;u���T�*i*F��	�LN�zjS�s\ُ����bD,oV[ꏠ��!����d4���T��4_�UWs�\�@�����3�٫|H�����2�Ԛ,b?.��G]QSj��S���`̟��K��Q$��sԶX>��up6�ǈ�X�0�ֶ�c.`κ+.?�Y�ی�����f�N�E
��a6cIemL�2��̙뢵Os�r���m���+&"�Wֶ�2ר��y٬��x�U���[Y��a�Z�f9���R�h�n�xi~�[������.{�=ʠsf��3u��#��,*:Wsǲ���De�?�fT��ԙ�'6MF4N���O������r�)c_�����ӕQ<uX�^���ȵj�^3�z��A13y�eu(�~]������Ԃ[עQ�u�ʆuղ4���"W�Sq�R-f&�^M4��Z|,�����W��D�X-&�3���G��Z�a�գ#W�i����*ý�
^ݵٴ"��N��a���w�yy��!Ӽ١�ޥ����3�<~�Q�|�Q#����Qw���Ѭ^1%�7�c��Хa��,�|Kd+�֖���:��w�r ~�q�MD�u6.�a�7�\��Qt/�^��>�}�K��^�4�js��^?��5b�~|�揨Pר=�h_�Q��8F	�r    6���*�x���9xu\�#?��5s�K�~rGM\����F]s����QHdD��&Q}���*���S3w���:��j��X+F�#���<~ҵ{�`�ʨLǅ������6�֊U�q�}�vkՑ�|/�Ө��9��a��ɯ�w���*t��O�f�*�=��k���u�։C*#}�aX��גQ<���:��uF���؟Y���:����C*�;����rV�cU���R�H�����"L������m^T'�#���TM�+���v�����ס��.*tvk��{��;�^MuaI^ej����1��[-;�]�c�T��B������u�2_XYd�����:i�Uk�x�=���X�9���R�Zt��W=I���S0c��N�E
W�o�EbŒ��������#ޗf����®��������$���5wdN��OG���Tm��C;Z�T[b�;ی��l��}�]���kq]���5b]T����`�u3Xf����QW�����U��ҼW4;�w�|&��3�g]���=[m
�U�6�#O���m�=98�zֵ@Y��I�=W��E�̺N,K�yj#>~p]4ԳW=�%Sx�T�,����#eP]�_ҪK��&(kL��˪kn�[�ΆƋ�1ӽ�۸׮�b�s��H��]�a���YQ���'�fA�q���q�M䛜͏h�0����q�����uiXFL�����Wmv�[>qP$ԉ��H�0��q���S;�Zmi��%cG|�X&��2�������?W�-��(�k�����?_�#yO�G�Z4�F�:�1#��}��3�Q��6�F��,JWF��!�4lu_˕�U��ȇ�_To��a�9b�S����qƾ��GP}�Q��<N_T[�^�V��O%�f�ZM�x.u���5�QM�,O�졘\��P]���Jq4R�1���6�����D���L�?��'N�ʜ�z�X�8������g3s{QY��Z�+��D��hg�Ï3����ⰗH��Z��������x�SO�h�gP=F,s����d�����I���ǐƙ�m��8�Q�C�Q2�#��+?o��VF�I���S[?�T+ί����t۳z��Y�LS�gխ-�qV�h���&i|k�Vs^��eu�`�~����ٸ���N�\g����v�ʛ����e�Yw��O�s���%������k9x��9�d�̤'v�f�h���<�0����9�V����#�c�4���������`�"|��R�e/5|������[�ȯ��?����ߵ����'�/��'����?}�w�n��O�>�]��_������=Ԯy�I��zF/��|�Z���կVWjײ�_e5�T��ϰT���$R�������KO[d�~���~�lՂ/c�a����gX��?���_X�_��Fzd��}D<�(jd�>0{eP�X��R�ǽLp�+Z��j�����sʫT������_��)��\�0��o��/�:���\�㹜:E���?�/��$���ި=���@}����:Jvek�$�������|ώ�o�^�O?��QB2���п�?&+�5�u�8yۯQ�gJ�8�#����VF�)2�����˨��@}����@}���5kQ���,;}��3;d�yk-�w��{�ጓ<#Kͨ�3wĖ�L�g��/���۪�@f�E�,�U��#O%��Ǫ��2W��ˠ0�2��ch�v�ʄ_^�a̳_;(��Ǯ����
��"v݉���^4dЯ�a����.�ǹj�:��	�$���c�:�.�b�ԝ�=�������3R�MO���U�N�gЩ���VN�z�����V���Ȯ�����V�Q���@}��z�fm�d4̨�vm��-6�\�Z����)zѺ��Z�Ŏ���ڹ˔�fi���ٻ����%U+�N���u&��:?���#(�T���]FDW%^�����xe=��˫�f�+�����u����~;P�a��$j*��I3�(���~�����)�x�V��?��te�u�[�񓎱�x4W�7�K9@�=�f�m�9س<Y5-cX�ٳ8
�4����"�#��G1��"5F]���5��%�É_Ĩ�f��a=����~;PЇ��ϰT���')�ہ*Ḳt�q�V�����-��\��lsS�M:��W�W���z`u�>�`(����c�����7�ygPoe��3�<M+n��҈�n8t�v�ѵہ�K���ԓ�jP_�m�hw���ǲ7V��U�hS�SG3���'#S�d�#�`e��ϰTo��~;P�a��N���D<u�~6��U��WLg+���'ܯzLt<��@}��o��|D�W���2�f�>$��Өo��T#�,F�Ձz�i{�6b�b/eܫ�s�[���D!����Z�A�O��ہ�3��v`ީ�8q?�G�m���*�����ݥ|�
��ڥ��:���'�g���|a�V-���`�5�U7�=�z_��R��FIz;P�̽�����:Π��G�(�3'*��\c�[]���2B��՞3A�v�>�R�:P9�{Yr�������#u/��^�f�21��׈3�#���q��d�P�H�d�2}G��7�'Dg�7bEr~�-�=��#�+���h�fLf�7�8��gl���Qz���3��l�Y�T����%ɑ뢮__�;���ҳ[*�m��V�ˠQ�+R~|	���b����|#�Mg�ہ�K��M���i����#�k��R��ʠ��шc+�{�V����1I��@��Yŉ'�9NNKfXt�"�N-<�.�R?
�ji��۰��L|$��@}����8�#�v�>�R�f�>�R]��4p�6p��cM3��n��z�#��@�j����GWF�h�F��(�mK*ӷ���#Ձ�,P�G�x;P�a��v�XH�~TG�@e���Q/��&�?�������n�3,�o�3,�o�3,���R�FD#Z��\�뤢V�J�})vv䷢8(�X;���N�(�o�3,եzre>Y٢����s�#�_�Je�\ˎ��(�5�v�'�E�k.�ہ������gX���gX�k�%�y��i��v�>�R�v�>�R]#(�x�#d�Zu� *7Be��.�����gj������*�k�Ec�b��q��Df���#������TW9����Ԋ�#�W�ReE#,�7w�gm�j�6���;?Rq���Y �>��϶�V��я�.����>^َ��ĻS?^;N��D�4�lWp1_��Ò�v�of�[�W���H9n�1|�r����N3�Ol��\pL�̊�M3���Q�ʥ�zP��>����D��E;ú�F]_9���y>~1և�Uy�#,$r��@}>��������2l��v�>�Rݭ.��h���!r���+�~/=��nܿ�gX��U�$�$��ҼY/�2�=d�x-�z�ўM*:�����v��,����|�>i��e��cr�V�j�)oVW5D�x3Pu("�VǪ�U�ۨ`�z�Gf�G�4_����2P�a�{�6�R�y�iެ��/)�Ce&p���t=�!�*#�-�����������0�VG��8�!��sWz-�����{T�$��-������{���"b�����cR7�c�Q�H�p��8u>("?��h̆��������#s����6s�`�b%[7�ei���8}~���-�~�lK$��%Q��V���L�{�(X���GZ�:��u��eEݒ?X��~ש�,Vv��*~pGYYq���G��<sD~��byU�y��a�6�Vv�i��$��ub�GՆi~�h�U�	�8����R�[���SӻO,̫�਼*̮	u3P�a�>��(��>����SM{�͵�����Ҽٌ�Պ�zp��ہ�|\y��ϰT��%�����jzć9�Xӌ|���zޫ�,��|�AUk��`ĩ�Q�����1��J��gX���g�������{Dj��Y�1��d��X���8iTp�ǁ'G�s��;�Buv�J�z�7���C���ǽ��+��I����G��2}}Q�3\�x�����dt����z���'����4w���H���I?    �Ը�'�8¦���o~ay�iՃ��C�V}�\��<��<�Ȃڵ��{���xa����6�G�E3d��A���8��/3W��/�ЈViV�9d�OFG�����gP`����P_�U?�̊+VyDKf�]�����@���ہ�K�ہ�K����v�iqծK��\�uXf�]��w�����v���ub2�}�y�ܱcaz>ة�Q�������|a��Lf�U�����3w�Y����(�%ߩ���w����z��9ԓ�W�j�f��@}��������v��l��+Y4�'6#hR�>�����gX��T]*����g��F2���$����ؓ�������s-q�/Ƌi�T�1�9�E]��@=���{���M���g��uG�Ӟ��2lҒ��@i��#���c2����V��}*��^$�<�2UI3���W&�29���6�9ǩ���9�1"7s��AtL���KF�1[IL󵸞����
�g9Bi~-�=����H����2�ך,b?H��s���10�F�=�/&֑?Y�|e�&H���m�|�Y���&f��"Āi�p���笻��s���}ľ~.����Б�3vǃ�XR�A���?sn
�>�J�x^��|�br!�~em/s�:>���S<39v�C�oe�↹ka���VM�2M��/�z�A��ہ�mķ���s�.��ǩ��3�'�EE�j�X��Ee�?��yu&�M��:q���	y �ʹ��o��>���S�)���*:ry��f�!����+/��@��+�5��};PЂ�(�(XٰZ-K�[_��)�թ�L�3�y�I�߫�ǒ?�iX�j�e��1q�I_��>��ہ��u�#w;P�a��r�4��c���Y�{��zx�+�����y�|����+�L�fe��Aq�|<s��gU���VYc���Wُ�hV�<l?3w���C���w�`��Krlm��9����;��̌�8�&#Rg���}�����˱�'�?��ہ�,��5BՋ{��^?��ہ�|Ht��ϰT��ϰT_��#�p���l4L3���497>E��FW�ȏ*�a����ہ���5ըk�:��AypDd��������7[��eP��_����*�Ad�]��OV<K�+�2���vl�Gۍ�����+����:2��eUX;G�3�V0�U�M�BW���lV�qӄ���@}>���өsu3P�a���aXg������:�F0�����\�q;P��v�>�R}_�
�GP]�����V�ř����|�W���G�U7U��H����1��[��o��B�v�>�R}��;�����E��]�>&�o�3,�w��*�U��cϷ���,2}��]��G��@]���=���X�9���R�*բ#N[�$����N���*�i(\�~;P�G�v��sePl�����TA���/��o���߬�$����̉��)����񃳶s�-��-���m��\����G�W��eԕ/�\#���4�G��x��{����}�yU*�^3�񃳪X�3�d�_�����z3P�%�V�>�R}���m���F��ϰT�y�~d�U��L�U׉ei�zm����zn�T�+g��fu:��q:R���%��4*k�x��kn����r��L��lx�:(�9g�:"�9���VΊzU�8�4*t���@}v��������`������U��:Ұ��>'Zay��숷|;P�a���@�?�]O��R-��^�-�AUL�:�v�>�R�����g��v�`���@�sʟvQ8���/��|)��m�O潢)�Ԍ�z�M&o��Gv;P�a�~;P�a�~;P�a�~;P�a�~z-F[^%��o��L�_�#/��Ǐ���GP}�Q��<n
J�ہ*[�^�j�~*16{3P�a�~48kң:���Y��C1���X?3��h�xc�m������T�c��GS��IQ�s\���1�W��lf�qQY3P�~��X��;��ہ���g���qU��8V�����ʠS���`3��"3��T��0��&�ofU�󓨃��!�Sh��N�3WG��s�L��c�ʏ���kE���ى?���O$Պ�+�e.<��ہ�s��LS�gխ-�qV�h���&i|;L��j'������uo
V��=h����b�ҎU@y�89=���?����qn�9U��{�z�o���ǽ���2���Q�A�Fl�T�̓=�s�l�u]񋎰:VZ�#]W�:"L���"ȵ	���^���,��ǽ�{ҋ�$���ޓ�{{Ob�I�=��{{Ob�I�=��']�=}��$����=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��{{Oz��ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I/ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'�xOb�I�=��'��$���ޓ^�'��$����=��'��$���ޓ�{{Ob�I/ޓ�{{Ob�I�=��{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'�xOb�I/ޓ�{{Ob�I�=��'��$���ޓ�{ҋ�$���ޓ�{{Ob�I�=��'��$����=��'��$����=��'�xOb�I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ^�'��$���ޓ�{{Ob�I/ޓ�{ҋ�$���ޓ�{{Ob�I�=��'��$���ޓ^�'��$���ޓ�{{Ob�I�=��'�xO_a�=��'��$���ޓ^�'��$���ޓ�{{Ob�I�=��{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'����I�=��'�xOb�I�=��'��$���ޓ�{{Ob�I�=��'��$����=��'����I/ޓ�{ҋ�$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I/ޓ�{{Oz��ޓ�{{Ob�I�=��'����I�=��'����I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'��$����=��'����I�=��'����I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Oz��ޓ^�'��$���ޓ�{ҋ���I�=��'��$����=��'����I�=��'��$���ޓ�{ҋ�$���ޓ�{{Ob�I/ޓ�{{Oz���=��'��$���ޓ�{{Ob�I�=��'�xOb�I�=��'��$���ޓ�{{Ob�I�=��'�xOb�I/ޓ�{{Ob�I/ޓ�{ҋ�$���ޓ�{{Ob�I�=��'��$���ޓ�{{Oz��ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'����I�=��'��$���ޓ�{ҋ���I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'����I�=��{{Ob�I/ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'�xOb�I�=��'��$����=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��{{Ob�I�=��'�xOb�I/ޓ�{{Ob�I�=��'��$����=��'��$���ޓ�{{Ob�I�=��'��$���ޓ^�'��$���ޓ�{{Ob�I�=��'��$���ޓ�{ҋ�$���ޓ�{{Ob�I�=��{{Oz��ޓ�{{Ob�I�=��{{Ob�I/ޓ�{{Ob�I�=��'����I�=��'��$����=��'��$���ޓ^�'��$����=��'��$���ޓ�{{Ob�I�=��'��$���ޓ^�'��$���ޓ�{ҋ���I�=��'��$���ޓ�{ҋ�$���ޓ�{{Ob�I�=��'��$���ޓ�   {{Oz��ޓ�{{Ob�I�=��'��$����=��'��$���ޓ^�'��$���ޓ�{{Ob�I�=��{{Ob�I�=��'��$����=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{ҋ�$���ޓ�{{Ob�I�=��'��$����=��'��$����=��'��$����=��'����I�=��'�xOb�I�=��{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{ҋ���I�=��'����I�=��'��$����=��'�xOb�I/ޓ�{{Ob�I�=��'��$����=��'��$���ޓ�{{Ob�I/ޓ�{{Ob�I�=��'��$���ޓ�{{Oz��ޓ�{{Ob�I/ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'�xOz��ޓ�{{Ob�I�=��'��$���ޓ�{{Oz��ޓ�{{Ob�I�=��'��$����=��'��$����=��{{Ob�I�=��'��$���ޓ^�'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Ob�I�=��'�xOb�I�=��'��$���ޓ�{{Ob�I�=��'�xOb�I/ޓ�{{Ob�I/ޓ�{{Ob�I�=��'��$���ޓ�{{Oz��ޓ�{{Ob�I�=��'��$���ޓ�{{Oz��ޓ^�'��$���ޓ�{{Ob�I�=��'��$���ޓ�{{Oz��ޓ�{{Ob�I/ޓ�{{Ob�I�=��'��$���ޓ�{{Oz��ޓ�{��d����=��'��d���ޓ�{��d���ޓ�{2{Of���=��{2{Of���=��'_�=}��d����=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��{2{O~��ޓ�{2{Of���=��'��d���ޓ�{2{Of��/ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'�xOf���=��'��d���ޓ_�'��d����=��'��d���ޓ�{2{Of��/ޓ�{2{Of���=��{2{Of���=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'�xOf��/ޓ�{2{Of���=��'��d���ޓ�{��d���ޓ�{2{Of���=��'��d����=��'��d����=��'�xOf���=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'��d���ޓ_�'��d���ޓ�{2{Of��/ޓ�{��d���ޓ�{2{Of���=��'��d���ޓ_�'��d���ޓ�{2{Of���=��'�xO_a�=��'��d���ޓ_�'��d���ޓ�{2{Of���=��{2{Of���=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'������=��'�xOf���=��'��d���ޓ�{2{Of���=��'��d����=��'�����/ޓ�{��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of��/ޓ�{2{O~��ޓ�{2{Of���=��'������=��'������=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'��d����=��'������=��'������=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{O~��ޓ_�'��d���ޓ�{������=��'��d����=��'������=��'��d���ޓ�{��d���ޓ�{2{Of��/ޓ�{2{O~���=��'��d���ޓ�{2{Of���=��'�xOf���=��'��d���ޓ�{2{Of���=��'�xOf��/ޓ�{2{Of��/ޓ�{��d���ޓ�{2{Of���=��'��d���ޓ�{2{O~��ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'������=��'��d���ޓ�{������=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'������=��{2{Of��/ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'�xOf���=��'��d����=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��{2{Of���=��'�xOf��/ޓ�{2{Of���=��'��d����=��'��d���ޓ�{2{Of���=��'��d���ޓ_�'��d���ޓ�{2{Of���=��'��d���ޓ�{��d���ޓ�{2{Of���=��{2{O~��ޓ�{2{Of���=��{2{Of��/ޓ�{2{Of���=��'������=��'��d����=��'��d���ޓ_�'��d����=��'��d���ޓ�{2{Of���=��'��d���ޓ_�'��d���ޓ�{������=��'��d���ޓ�{��d���ޓ�{2{Of���=��'��d���ޓ�{2{O~��ޓ�{2{Of���=��'��d����=��'��d���ޓ_�'��d���ޓ�{2{Of���=��{2{Of���=��'��d����=��'��d���ޓ�{2{Of���=��'��d���ޓ�{��d���ޓ�{2{Of���=��'��d����=��'��d����=��'��d����=��'������=��'�xOf���=��{2{Of���=��'��d���ޓ�{2{Of���=��'��d���ޓ�{������=��'������=��'��d����=��'�xOf��/ޓ�{2{Of���=��'��d����=��'��d���ޓ�{2{Of��/ޓ�{2{Of���=��'��d���ޓ�{2{O~��ޓ�{2{Of��/ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'�xO~��ޓ�{2{Of���=��'��d���ޓ�{2{O~��ޓ�{2{Of���=��'��d����=��'��d����=��{2{Of���=��'��d���ޓ_�'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'��d���ޓ�{2{Of���=��'�xOf���=��'��d���ޓ�{2{Of���=��'�xOf��/ޓ�{2{Of��/ޓ�{2{Of���=��'��d���ޓ�{2{O~��ޓ�{2{Of���=��'��d���ޓ�{2{O~��ޓ_�'��d���ޓ�{2{Of���=��'��d���ޓ�{2{O~��ޓ�{2{Of��/ޓ�{2{Of���=��'��d���ޓ�{2{O~��ޓ�{/��`�i�xO������`�i���������C5X%      _   8  x��Wێܸ}�|g��@w�����%��;�ko23���_(�$�#�
Iu��������a���"���"&�K7%�Xu�ԩ�&�q�z�⵴.ym�k��ވ��(�y��B�RX:����B
k\2�(Z�*D-�t)n�ZQY"c��J|��O�fXX�fZ�]�+�B��⯪xf�ёJ�U��(c�x4sG��ģ��1��Ya�j�W�N�4�����FkJk쒮od�,KU�p����A�zp�(���e���K�I'wꋸie��[_�O��=���D��=����^$~��j�4���^�L���j�Hw�U�y�Y.�/U��t��w��2��7�����O�/�ɇ[q�P�;#�@:|C�[�d���Q��0W�K|q�S��cM�8(��"��U���{DOy'��>�he/r�N���6�"�H]���ƪ��`���-��c�z�g��^Ս~��E!�@LpH�'7f�8�zp�!y8��l�O�#��jid!���5.|�_��@��c��͠�]o���ն8� E`O)�<l����N��n�>ID�ܐ�@�ctc66�et�+�ڐ�H'>P��w��)}ƶ巯�B��0�2�ۑX������'���7�K܌hz�����/~�����z.�l���Tsm�,z��{NdK�)=xN�	*���hJ����0�rBy�l7�y�ۮ�����Urk D)R4��?[�r+��H��a�T<��2R��%'>{*mZS�B�G��q"3��[�&:/����tHqO_]�']&��3�w�]���*�9�}r�r�6�'����Ysj+(�?�7T�B&b\1`^�\鹜���w��Z��P���|A��Z�_�2x�����+��B��V�T�` �d0���X����;ӂ�����}6ڴ$r�Ԓ?�,��DX�n@�r.�}��Ⱦ}��
�eX��~h=;s"�PFZ=�Bfe����!���B�?�U�&��!~֍g˱&T�F*��Q9=�e���w�"�H����7S�W�r		�n����2r�ˮW�3���kzq�bfvh5j��Z������������G^F������K�N���Vބй��n�P8�\�
���ǁ�v��ͼ2�7:pd�������^r�.C/
�1W�@���1�q�yg,�Z���C�����D(z2��m�1p����j��#y�~�'�?�&��<�� 7���8(�?��ħ�s%0Š�6b����ɘ�F�o�����NBi�;t9/a��lQ�J�0cc�5r�0h�I�M���ԈV��0����a�R=7��5E� ���3Uk����3I���"4O��; �K��&~ܪ�?���A�
 ̩1-椡��sn�a0�4�U�F�'�~�+��N~� �F_��)���{�kR�3��m�S�w��1����$M�9+n5��t
ը��[�t�j�q����LuH�h_2��)=�E���r�$p�9f��4�8^q�Na �}?{,�獀Hx��v�4yl���4��h�w�"�E��$;s��#��!B���J�U���"�B��~h�9�e6��e�Fj���j��s؋�q���VE�ߖѝ�$�;�Yl?Z�q���E��%��~���aty�v�	s�
��4�PX�
L�q�bF��NA�e�*\Q7�G˃�������W��T �@���7�	R���@�0a��0R�mǩ$�.�Q�F�]�m���?���9�=�m�R!
j���U��d�0�������@	�(�����Y�߯WY�d�͒�@�iv~�K��-/����6��,�>E���>�      g      x��}K�-9n�8�*r�Q�����hR�R�4��dUi�Z� �{� ���@�I�q ���h~Q��kN�R��������/��/��o�����S�W�"R��k�_�܉��/Y��+��"��_�ѵ�j�j_4n�L/���Y�T�_S{�O�/�� ��焨�����	QՍ�}���n�)3�"��x�O��t��7����W*���N6�(�Q�T֕�Ӆ�k�K8��$,x�$DY�ڣ��)3�-���S���-Q��jY�_X�d;?X ���#�n5S8�&��=�+ş�t�>D���X��=��ކ�>=�DKU���~q���(}:�!<��i~��q~L�m-�ӫZ�s�@3e��{z>�_��{���B���L���a��K3��Ogٓ�z�x��d��������{��3�v=X,�ѽ'
��{���zNX�˸�
=��f����*�a�[�g�ج�N/����\t������d��t�|���7>32�Iz�Gvo���+V�dOo>��t:NQ��K��ͧ�����։�/x�N�4�ӭ��,�s^%���Gǁ���q�t�|8�X�cwo��-������˽pѺ�ju����=�[��{k�𰪂6>uO�����ч5W9[���lz�˯���P]L?9�VN�ʏ"o���*�of)US�g�os	f���b`�Y�I�!E�RN�{���͉*TW�h�L���zҖ�-rƜo	��ޅ�r1����}�r�b�{9c���q�Q���Ǉu a��s��&tXS�.�>͉�v���A��`��㶃�D�H.��(��/�p�cב���C�s���JUd_&ʿ�rU��ZpB�H.�	3�"T��4'��H�.�Ϗ���L�R�i����{�c��X4y���F~Bv_��Ѥ�QR�)��PT��R|����k_��)*�Di�X�}��{�(��3^�5?�x�Q�}��&#s�\���ˆBNHqZl]Y��fm;H�����e�>Q͑k��7�/�c�wH[6�޽~�Y��/]��U��ia����?�F`C�����
�j�ۛ,޿������'G�n��|`�*�F~��7i�W�u(U��/��v�{>}Q�*�*9�z�~�⽩V�8$�*�/�\��w�y��l}b�Şo����h��.B�E�Ջ-lk�{ѯ^mM��ܛ������߹#��q�k�1�����&�y���<a9��t�.]}�x��=��(�t� �*��R��s�u}���|Q���v���9���&�u��� ��W	k0��~S���OD�}��á9�Dګ�5�%4��° ��:�i�F|����kT��lV' 8�W)k<yh�s؈@�,Ŭ��B	I5K6�(kq��j��8���ʿ���ο�Za�*�GBA�'r��%���s�����_1U�9y��c�b�&e�>7	Ψk���@s��R��PMe��7�4:����(�����j�+�&����ei�V�_u���{� �'(��Ck����C��;*��Ut�r�͆����s�-���`
�QL��bm�}4��|o~M�jy��4��Vs�*����Y-�);���(��at'J])qL#�V�!W���}����؊C�_%rxN�����Y#��*T��PX�W������ZS�h����|#5T�]�#�O�*W�哴E��a
a-*\-��6�P��
�%:Qچޅ\-�����Y��ׄ�&�/���a;J���Z�l	Wk�hA+'j�cǲ�A�J��ʺ�ZlfU"C��i/�(�&�k��+\�ݶ9�X+��ƙ�.�Z�ǆ��+'�fC!�$glC�)���a|A�,rlt7���F�(��Q�`-�}�[o&^�y�9�t���~'"d�ڸ�U���WW]k0�(�"߇MH��Z���h��kt�O�V��\]���L(�
�{�~5����fu"��0�n3��
9��q� ���;u�����]_��"4��އ�����8>����Z@�l�C(�Q}�d�J�l����׵a�!�_�Y�_�m���P���b��q�=�����︭r��z��,Z8�v�CdK4��gC�P��5�o6�l���T��c������0닡Ϲ�Z"t���{c�aV��Ǝ���R�v��ƺ��Z3v�_|��&Z��zwaQ%-g\u��(�pb��9F���G;��k-�fR�W[E=֒��Ѩ*T�r"�_$T�I�C��ٛݣ�rյi��XR�TQ�)�ۘ&�J�'��d�rru_l�0'��d;x�$�|1g߉�yJ���N�hN����D8��_+��%7��������BN�a5WV��Y+������@>Q(�q���v�3̣E���L!:�k�N��J��19�H���WA�Y��^&�S�a�?��h��Bl��[�)��Jqr��	'��9^�\-d��R�q�R\��%�(u�t�u�K���%��\���H��������~�����?����������_�����������ʼ����}��?��"���^��?~�����o��׿��������ӵ�՞5 �)Ÿ�����RS����m����څ�Ҡ�7��k����A1o��'��	T"ʧ������������n�)�K�(E�VwZ'���)������6BR ?�S~�}#Jq�y]���z�n׼�rD).���������X�DF�}��.�d5$Q.u�_)�Rdt���$�X��V{�i4���Qo6�¯�ٻm�Ci�ه/�s�Ct��z����� �F�p���>G�p����<𕡯�Ͼ���͑��� �x4{"(#���^�b|��c���5EC��
]��賛�2����1�^��6Ğti���Ȋ�D��v-i��Y},�~I�c�[�?!nt�~{��%.Zs��)Z7�F�g����y��j1���U���u�ի0`�\|#D.�&W?r8Q۲��:�.�vKgA��Q|"=�3j��!��Ξ2#ʚ��\�u��jʾ��lB��&�3�׋��r�,�ն������&��2���F�%��<�!z��/� i���(0!_'��J{;VS��s��-��뚴�=�2*B�����JY�O�9C�.gH��"��_�ulu���;��k�wBb.�>���e����o|�r�����"�R�y�O*۵��D����Ƕ��N�..�&S��2�<[ң�_����PJ��?��O?�}Ґ��WՄ�o���54K���Ud-O<�9��NԶ� ��t뗒6z�ί��7�~���i-zZ�����1�\���|�2�z�6"d�]�J�������U|��j����.�_8�π����3#{�5��co�k:���z	�m��l��Z�14��6J]�aA��PJ�C�-��Uo�0_��y�	4D���͊�5U�ڰg�9�h]sW(
���.����d�Y���(7��:�6�l��_9Q��#�?��#:D���d׉���@�I]8��EuG�s����u�����s���1���J����O��a���ۃ�ˉ��a3�G¥��>�J�m�Z�.�܇ׂY����g8�R���2��g�u�`�Cf�SVN�p�o1}��X��њ��j}rƕi�Ͷ��Ϋ�n����a}����i}2�q��{�lo�[����~V��u&�@�#2�b3j:ȝ��<Ĭ*7�� �)����X����M(M�V�!j����jrK[� ;m����]�+��`��TK�c,���Rݲ_�K-my�ϖ\�p�ں�m�a��,��WR�h��!X#��|>�.g7c��S��i����ik��� R�r�y�O�tyD�Dݎ)��P�46t�6m��݉D�2o!��#J������e{�.��F�t8�Eʉ.���L��Q�\"d�J��T%���>���f��t`����#,D$��7��P�T�����yQ�kk�h]q�*��¥���q�f��xo9{i��a���O=}��c��sl�'�uk�\VE�Z+[+�V�����J��CPF�Ϻ?1rI�^��6��⋲�6�~��k��A�~���oca<��J��TК�H:��tM����m�.����@�&���9�r�����K���ۓί����an�����Xt��װ+���/ #  B�E�9�١ܕ��>�!��i��}H߮PDW���|w��E�k��ԛx�u���l�R2숵5�o�BЎ��W� �����	b�(�_Ԁ(Gi�����L`��;�O��(�3@$_�>���q���m���i'�"���w�u�>��ƴ×���W�AF-��Ux[k#$�����&��M��N>�׋��1�Ѭ���a�Mw}�>�ؽ��XP[�	̣�6��_5�D�鞉�V,��d/���B�#��*��DL>"�^d��!����� 7�C�.�s���:��{E���.�`�~�f��?#�R^vdrZ���D�"Dᔲ�+v0c�'J�vY�����20�ۯCM�B�=iv8��r���lMO���A��	eNv����O�����uw�&���zvW3�G�f�5�TI�[��?mQ�����]ќ��}=;��O�B9��M�:��]_;�����Rz@�;e�	@�VNDd3����N�?� ��Nu��
툞�O]K�y�ۃF-�4�#0�]��>��i'�ף�����d3�	?K���Ȓ}�U��R�
Z\���,�Q��_Bq��n#���K��%ܵ�e���$I/�S�缮���w�&�VAԨ��Y�>/��p�B+6o����5K���k�[^֔xT]�p���u���6�׷gN��η���~W.��iP��u4��v[��=��H)�vF�g��6�y/gJ��̓K��m���)zsv���Z�p�o'���=o��~{'�aŧ�e{�F��ɼ�39��3|_E�u��zn�}�,����!���t�?�*�K���fG��i�px�A6_�聮��Gh~�/��<j�p�>�gg�q��_8�9;�Kcl_�~i��C@�����O�'k�0��g��6��Iy���}k�pM����7���ܟzF�p}nϤ�����D�Gg8����<G��j'{�F�8ξ��A_8�{	}�د���z��L%A���Gp�F�n=�g�	=�-S���-�B��l���>��� �ɇ�=-{�#�W��_���#'e��)��f��s$��\<J��iX�]���T!��P��K0v�g�'��/6��'�>����:e����&�#�?�]�/�4�'���gvvsZ=�{��]O4�g ~I�d�X ����!�/�Ay�&�8��3��B([T|U�.=Ϸ�r0�de��@��M�Њ�y����}nO���9�m7����v�S��?��H��8����'������咜}��>���3���+&^FqX�Q%�\8���
���a��:j���M��	}x�rԲ��(��z+��ڨ�g��Ш��<�M]�aO3��և�X�l���,�h��[\�[�	����-T��~��3��Ī[����lm_��5��!f ���B##�ӎ6��QB]���N��J���g�l����K}ǽ���e�~��u�l*�M��z��YDC�R�jX82��a��b����y�?;{'��H~*	`�J����:z�A6��lM�46_��c=uؾ�b����e�PF�oON�	�16�v�p}X��J��� 4���}s��}n��1�gk��=�^A.M�?�م�}��ޡ���7�=���m�&�i� 藔�lk�Ü������ �#_�=A{�?pߢ���ý����'�K�WVt�}�xM����k����:��Gޞ�G9�L�O���P�-OFH�L�	(�P��pfo
e�y2DcH(��'�����g��z���-s����ȊeT�r{���s�[C(�\8��OF����<8�hHޞ'~f����P��^?�(��C�$���	�h��)=x"�ϼ=�gt'%_#�;����I�k��{7'�y8�=�z~�	�Im�
�aR�~�]Lއ ,Ht�\��%��Vb��Þ�,Oo"���������.�����s�3<7��;f�8�����\8��_�2*O�}�?�_�uy�L��ۼ7�w���3��>��5�i
��dͺ�&�-����:�K�x�	�Y�����6�����kny�X���M:�+�:}�;�����lnN���-o�z�F���]6�}�b5"������0�4�+����R{~^1nz���y�����5��K��7�{��ur��6�r���f��}��W8-9{���H�Y=%�T����7��i�;:eV���)a�3��+?���D�S
Bip�t�)�}7K|�V�A_ً=����[}�s�&O���紇5��@C�rl(Bt�uo��8�	�q��q����K�և�݁9�zZXˈ�Ͳ�������~����uo�=�8?7�x0�>r���ғ{�����}������K{Ev���g:�<��O��O.��3������NF����W�g0]`43yzJ�����TIч��#�1��f���e��������lӒȊ9��!,���Q�
e��3�.��fk�ێ����ZW��7�:�]��5�p�8���KW�g�+��#ݧ�� j�_o�k����0���?Bx�]F��y�k	�N������l���B��M&0�v�ڐ�y{Ce�L�W|��e��C�iXr��x�3<�6��L�)a���S��;΋���_��B6"@�H�Y����.nNf,J�<���\��ϊ��\�
_�ѳO/M����꟰��<b�l\󗛸�w��3��εl�G�׺Նh���v�xo�2���洼p�'�,���	�ýr��5�f���u��'2j�O׃}
��{CNh��fk�;����7ù�-nB�l��q�+��EX(M�Ӌp�B��>c�sܓ�&��N��������G�j��v�gkg0�����g�׽	���@���pzJO4m�'��n.�#���3��X�4G�t	�����Ta��57�p^�>ꖥ���G��	�y]�[?'$���KXC��Y:���O��f�>s~�/�s�Q����@jX��x�G������	O���l��_�i��=-|��'�����~�ᔭq��� ��Lފa�׽	��(�b0����כ�Bę?�X̨y��}��%q���4"�S���i*���D+���u�0%us���B�=H/Xi�>�T�����pSH��͇߈��[��τ��֩��{ͮ�=�X��f�i�Һ��ɧ��␐_WA4TH�7@7	���>�����@8J߄�M8^���I�;Zp�('J�`�����m�ض�]��b%-~"���V�ᘯ�:i�L_�e�:���
��ݹ���AG8�+���8���*i4,����V�ר��Be֚x0�!����-&l�e����7~xRH��P�"�sk# PH��@�g����|>�o��      m   �  x�m�A�)D�z�� AQ�2�?Ǡ��k
VM &������x��j�e�=��Q��[iY�P+U�̿,~�zU����Y U����PU��BX�݃.�
�j?Y�<��YU�T~pD�wy�"��j^n�����!-hu��q�Z!��G��V߃��k��#ص�;k���xBZ���!,��%�,9�yۦ����Z��u����ʚ��j��N~��}P^Yk������wV�u�ԟ�����~o��7����{c��Q�^����[ˇ�T�_��XRM^/���C-<��#bt���^]g����*{sl�ym�rf�3{� :�9��f���;/	������R��ɞ��c��W��l��JXg�nK�������������|9�K���@:|w��÷��:��/���cI��O��o�<��`	ȃ���{���z�؃g�l|��}ɇ�|чp`"~H�Cz���� �� , ���!� @�`h-� ZF���	�F|�6��Y0t
n��`���K�ޢ���k�>��'9����h¹&�k¹&�k¹&�k¹&�k¹&����p>�G��H8	�#�|$����p>�g��L8�	�3�|&�τ�p>�g¹%�[¹%�[¹%�[¹%�[¹%�[�)r�9��s��9S�)r�9g��3EΙ"���Sk��      i      x�m}Y�,���﹜ZH�s���������$�Ө5	!O�G-*�����G��S��G��g=͚���������ԯ��7�Ưaf��_�O�7C�ۤ6�z��o�o��o���9V�Oǯ�G٦6دM죚����o8�w&1;P�o������?i�o�UH~�?����jm����'��l�]m�������-���o������v�����7�_?={���������ׯL���k��[o��!��s;��x�}��������߆C���G�j��������_��淧��I�>�w��A5�������:~�����<���9�w~j����p������v�1T�,��b�m�7^ý���o����k?b�9۾�
�Sk����hߞ����hHW�6[�w�b�hӈW�8~�3^�� �fd5ޅ�Y���Rl2�6A����]�ǿ�6�_����~܀5v��G��G1���$Ew���q���(�����o<;�Qn�����pܲ6[�¹���9�CY��� ���f����0?y5�7��1i.�粞�/ƙ�8d}ߵ=�8��Y��� x�W�h��.M&r�ڞ���a�o�������K�Ǒ1�:�8���o�}��1�:7�L�Y�����߲�A?#˥�o�L �
�.yd�#O>�Z��^� �[ۗ����̚�zCN�i.;����˾ �����.���d�애ԭg�G����b)F2�F��	�j�w�3�X�d����F����
��g䶍(?vuR�R^IqD�O�\��_Eac��bJvL��Α�VTo��������ڽ����gꚷ,P�:l�}8��ɯ�w��ſ.rN6����Y@z����ֹ��g�dIN�_���kd*2���U���ɫ-�>�a�4��ڊ>��1]׃~��뻢��uZ/m����uA�mo�@K����}�/����E�QG�Y����{��P-��b_7�J@اꖪ�%��DqMZ����3���o��=[ҍ+�Op'���ܥ��Ezz������,�$�Dr5�����+�3��l��K kl�菨0{��:p�$��n��Y����Pߦ��F4���e�Tz9f'pR�#���&��0�1���G��5*����Yc?v�S���}h��8R�~�
�����ySB�J�$�\��0��1��! �R�P���f�Q��p�k?od!�n��AյP�2��)b���c�}d�}h�.I4n`NW����,�V��iN!$��m�\������gVC��[W5l,����d�	U�C���CM��,�#�~����j�YKX9�.�S1�U��|���lG2Ec2�_��X�r4�ɭI�>D�Z�hꩵI,'�]��	��B��'~cn3�y�+�$��F�!�MO���+ڃ\q�sORI��b��d�7����Z
	`w��m����EY���U�%@..�y�O�WK�]ҧ-�Աo��I*%繘l�Oi��斌�I���f�%�)J�O`RA�j����f��Z�Ȃ���S·&	e1�RY�rh�E-Q-$/\#�� ���^��OT+H��E��o��hi����G������sB��6��@�hl����eR���P���Z�������%6���7�Z�����t޶1ǡ�s�s��-�k5��#ew��m	`c_Qc�(θ	����A�(V��L�����^�h=;�n �ϖ {�]7m(J(Dm�P��i�`�VӒ�mrT�,�3���޹P׮�J�X��8�l^	�CZ �O���>{ZO[�i��Y�A8d7��9
�.1`P��AfJ�2�9�1��s���h Fˏβڅ�x]���h��O��"�Ab���m�_�D�V�U�@b8wN���Wub�fcщqv�"�c�S��d�Pn\`kK�:]|�t�X/�,�����ӥ`�K��*(�����^R\ i	V׋��\]d���t��#�X��x���]\v��iL�J�n ���+؛v�n<$gD�!!�.�� �DK�=A�֤!�b��y+��g�ą|�0[$`�Zslq ��w�w��Ȝ(��⨯�&��ա�2q�-��ZYr.۪Y?fE�9�6.*��*
fBT���P�դ6���&�6|_w�
Z�B�����mk\�ć6pCeS�v 5�0�
Ш�ߎ��@�ߒ��Y�-��M��@q��~>E)�8��ώ�:(j�����>�T=� "��m5���$^�2��H��h�c�Xc;��k��a�V�:`C4,�Z'�/)�j]E�|Eu�V���'�����ؔq��}�&<\k�67c���a����-dkmθ�V�m1��7-��Ju�fs!j0r4�P�l�;'�^Y��t��	��cu�C�0� �1'�d�7׎��m��(?å�Ba� P�Mh�У�d?�D����1-��N���
B����Y�8~���qLUR ��O�Y3�S� ���-ԩ�MTs��s6P� T��<c8�8уI��� ���~n0�S��Un��7�%st� .�X����`�%l��Q G�X�ԯɚ`5��ƅ����nm`dI��ғ0���=7��g�w��[H��.�uwC%id�b��IG�0z�Т��G0�A<�y�.[Z���7*9�nP�R��}��klwl��;H�h-��7N�g������nL5��[$[���
�`E�F%N3�����1��ڰU��h�".�f����_B6�_d&�h٤-�l�������F�C����zK����E�?�o�^���w�87��Y��T�����M_ �X�6&�/[-�)�G�w�1-���-4�a ��)�F� �ډt�jc�-����E:�x���ͱ]�9͓����7|�����r����o褧l�� Iy�� ��&Ss~~J;���'47�\�g@���13����PÉi���[R�����>�@ai}B�WO��Tz��o�b�=�ns7N�Q
Dbɨ���4ڃ�|~t�J��1 �&)���Oc�9� �,�66��\:M��%g?��q�6�����!��:��(�4�<P:���p�k��T�%ͅa9lr�������.ܗ<�x"H[��D�U[�!�H�a��F�Ny�V�58�7MR�{l�=T���>4
��c`���oa1�r��3�in>�
�}�c� �g�;Ynz5�~��$TȞt�n�62$5�ޤ՜�{)�Y�V��x��˛^S2A�zVF��l`}���-e
�K�|RWu��3��\ �[ȡ^6��#c��lO��Z�2���j��=�6$��D`�u2@���e����M7��=7�IY]e�y����]�us�����Y���ژ���ί��������0�8�o��l�5nЉ��uO�dAK�����IK�����@��ڈs�?�n_����C��Ғ���XN��]��k�E�y��-�7{S�~S��VQ�f@���'%xo��u������bC~rֈ!�v>��Do���^Y�Bpv�]g���Dw��OS����-0�|�}0�(��I��[3�#v�:�{�,s��Q1���g�NJy����٘w��>:�����w�\�99�"ܡ�F��T��Oh�wS(��m�����:g��7<�D�O�1���Z��ɲŉq.v`����d@IN^l9�ԗ@�!-澔��;ϔ�����L�\B�~�_of����<C����X�w싣�](*xa�0�e�����A�9��ݒ��'\B�y�$�����_L�x 6������<2<��f��	��x�q,oD']������7^ȱQ�p�����3K�?������Z�f� �q%N�2�g8H">�/-�&hZz�� 8���W@ik�ǐ����c�5�!����2D %���ǶA�G��C_����(,����*��e���z���b��h9�����ONO�Q\Q��C7�ɱ�Z(����aFzdNvU�SɀǨoJ��Ԍ��l��Qw!8u��T'�:�ɬd���4��V���@ܚ�>�Ӹd��5*�	�=�9_    �"%4�hvΟ���:�6���rd�E�����l������k��(��l�������<��+�C���~�h݊}����r�7���a���l��������b&�Ba)�2��;�l���0�h�k���y�c �
lTK��3Ƃ}�pg����,6���E&�!��� L�wN�2��g?��R��SFP��k	_��q�d.П�b���B���U�Ds]7��x	t�?� 03�e\	n&���l�Q���L_n;�h>%NJ	�����n�������X+o���Jl�v�p��OǾһ|�7�I��� �����ACG����@�����v���R����"�wN��(��a��1��f=�)}��/]\������qR��sv,�盔�y�S
�=o�L�(L^Ӝq���h���s��Q��i=�s]���I�@.\�gJv�;�����=b���o��n�ϫ��]+NU�93�ajFλuS_��_����}n��;"�q��������������xѬ��wf}m��Jvmo]d��$�A"/b:� X��0���%|7+CC�9�v>�i?ǫ��4�c!�j�VP�'�3����MYQGc吁�����b=_�`c��$�m<�����xA��
{b�M�(�^H��4���+Ȧ��g�p���<� ��^G8k�pAj�]����8�7�z(�%�g; Ϙꞣ<��<30/����$��G��(	����t}��:b`�g�.�nL�������`f�ͱ��N���]���Ʉ����^=v[f�z�:q��q��Ҽ`c��9@���ŉ�d^�sA\���S	�v���n�%LO�(۷y)9����w�C��� �����f�y��\�$�4�?B��uK6k�䬸7?7_-���h�]��}Y�.�v�X���~��>TnF�$���l:���N��B�����h07/�M�U�R�+�����J���*��ί����z/bq,f�52��H�*�>o���H��^|��/�`�Z	,~��Z��[�l\f&b ��.h�0�gJBp�z�xЯr?u	��ytɢ�wy�� ������
6�-E�/����3�7���oιxY�������Ո�-ϔ�@��A'8��7�˔<=�q?�$�ZRs�;�����-F2���jϖ���Ej=�t(c�U�ߜD�dK��T�~I��~��P$X���$��r�r�~j,<��k�Ɗ��#�K���t*i���Z:�;������������گ+K~��E�Ԇߗ:�%����,�����y=��.��{C���:��j�A��sLZ�[�ˡ��d_W�C,i�ݿ�}�Q�0��!�!Q��4�����n�/��	Ѳ��z00�*p}ʛ��f�+�E��d��@,.t&_,�7��-��5�d�:s0"ݽ�Mi-�/h?_D��o]���*�+p,d-�S�\��"8�<Yx��v]��t�.�L��n]�_󹂒����WG{���k7�C���܀�[��S	����A�>�e��$؝�t#s��w:֞&߄���D���f�j]w�̼�Z=�+��zW�yy�f����2הF��K��M���ʗtͶ����D�D>vܴ �l�eKy$1�݂�6�e6�w�VL�Y�`(&��l�<�Ln�28�}Jo�WySj�W| ]o=�8�1~~����Bc+qW,[�p�O�ZiP���b6uɽw�T�ʕx��:IY��؊����Ĭ֔N�*>���w/Ѩ�A?���sJ�-!vt���DN)��bI`f�"ʟ��v���Ŀ���� /�  �o}�;�	��|(�q��|� �5d�n���`�K�u��Nb�4�w�d���o�N��ʆ�R2��C��s�[����ń���V�8��� �$�Ի��ϭ��q�#L��N���!����:�o�g��=�zpȶ!����J?���u�/i4N��{���f82ok�����myw����"pxn�B��'�l����쭑<�x�x�,����
Vߔ����_�$ �~>���f�x�>3��d�5d�z�IPK�,	jɷi)�AW�{a$&!��� �¿�9�������}l=1�?�YMZ�&��=�����;h�k{+S�/sW��F퍑�r;IFw׶�w ���oў��۔�ANK{��p�%�`���z�|���>D��R*#%Q��l�]�pE1)��Z�H)/y(�[��Q�ț�sZm`�7N��B��SZ.�E|�b.�[K1U��B��y����P��W!*�0z�����T6B�b)����+K̒�xA,�S~��2�]��Z_���[]Ü�� ~���)��0��e�үԦ����zU:&��9�^IH���|� �3T���"���<�J��Z����ڌ���s��M���ʃEƒ����yk}����zU׈U�Nȍ���-�*o*Ưu�������Q��$�a8!�"^e�Z���ު��t=�R\�w2@E��| ����u�~� �9�b:5�0b^�˺v���R_I�^��@l��	 g��轾���Yqo]�j���{�r��X ,K���pZ��z-ּ/�!��b\���HAɺ+1��N��&��	�?x5U��"W��T�L��F��r������M9!n��/�
~.ݥ�U�>�R�~!�IX�;J�$4�����+bHys3�N������tMN���@а�q�^�`�R�Y]Y��ᕗl��؆�j���X9�ʧᭃ�J9a�<B찰���D�ϡ���5
]��%��P���L�}g��p��:gCK�U=��J"ӅL�چ#�↢XA���U��q�8K���|��A�|�K�ž�ו:j�G��]�}��?�sRyq%g��������d�Vn'�[1=9�S��э\[��Z�>4���'�u�rjt6J=zN������~'w��c����?�P�=sKŊb�+ϳs�ͤwO�#���m��y��H����#��O� �>Af� !D:�QhG���Ix�Ƀ���x�b�`�d�U9<$��kz&�6
%�y�N�t)����װS��֞ڎ2���Bvbe1�l
I��iV����=V���̇>��s�H�/���,���2yFsqZ��9*�|�K��-�s̶楬Pr!~�Pq�C�ȝO�^�!�06s�	S@�_+��B�^��9삈H9���,��l[��s=\��UTP�%�7{�J"b�c�����X�ܯ�<Z�[�������MQ�T����ׂ�+O�T-�`���*�RA�'�(J��
��w_ 68�#��ʾ�u�jЂ���Y�D����T)`�$�#V"+���R�6 J��B�o��P�$sX�D�\h�(�HF��7ڲ�W,�����y.�T����W1�S���%V����yT���ފ��YQ�V��r�i{�ĂZt����92ҥ��Z�b��ho���(�� VW���}���e�v�V�9���;)W/�q��>e?�xtrx��@9�~��"��wVЊG�h���Ik�1UE5���-SIW+��:H���H{�?�}�#�X�iQ�R�Y�z�zR����ܾ���W�Q����EJr�_3���UU�z�9��`��s,�#or!�)Eՠ��ǻ�ڊ ������fk�UW�� �.{�ۨW9��h]����QB��Ę�;�)דA����7���(E��a��(Q����?���8��>�X�0SOD^�;5��o@�I���j���J��z֟���auR����Vt�0Q��Vt�p�um��b�6�쒴�u��L��K��yk%�30\�|Q)J6���ǃe����X:^r�׸,�I�}7�s�\���KM�"*0ޚ�J0bn�i����K�#����X�3�k��r|�>+��Wϳ�p���QU
�_l{b2����rN&V����=Fhd�x��T��x��r�ҟT�8��sX���S��c����Xk%ITf_LQ�ԿV���]'���0)��qߢ��}���Ъ^J.\ت�t3��HCI��]G�o��sZ��� l�Z��V����W�g��+���։�ZIy[+<����Q�[bM��X�{��,�!�    w�T�B�@�H���ѳ�_bɐ��/�g��\V������_I�_������y|_�h#Y1�Ǡ�a��-��u2�B��~�s#Z�#�k7�*�T~)+ J�A�wN-o�KWv�ɨ<�D�������#h��x�C>>�K^�Y�Ԑ�q'f�1Y���pI�@��˹N��>pv����X����$���.��+:�KNb%1�H�%��
���{��G �PV}miy��� ���bx9
lu2S���":޿Y38}�)2�&�vN��,��/��M^��H��_�`�z�&�]B�n,�_�z��C�/��|�1����9�'n��W�5�F)�Oi���]w�߾���������o���=�{�bXv]���#�pٗ���Bj�K&$��Ǌ>R�.�&��l��L��n�	��� !� ��[��u�mE�+�Թ��	�K5��k��(�C�5�:˙S/M�մ�̍��`w���Q�͘����.��ɭ$�t��ja��4�5�È�*��[%Htx�P�(���YO�he5�ҪA�?����L�w�T����i¢'f� 
l����������N �R��l���'�n�!'��ςk�$i{���,�V�9����R��J ��ut�h�!�W���^���u|?�]\�����O���+��I����Ȇ<W^��*���M;���D�L�
E&w��s�RjT��tm�:<V���D����q��W�N%'?P�6�� I\�jFRU՘��f��|4���D[?i��Q�9#GQ��c�2�2i�U)J��y+3]؜m����ݷv��z%��/~�&�H�����k�*{������WR��� �ѵ�
O���8we I��wo�H	�X �<��6�|�#�X-���m�ͫ`�^�TO��&�Y]a����8�pVO��ժ10��Ǟ��-�t$���'����u{~�XQI*�V��&��+������}p*+,�ya-vA5w��.L��	:�y��h�%�i��^�8B�w7Q�={�n����
���VN�ػ+�/̷�>x�321�2(�S��p�����	�'�������yr_Ũ�Xk-���IT�����1㭕��H�����޹+9�)}������D��6C<�^׍�y_,X�5[����}��ݒ3kʱ����Gz$Z�!|��$x�ASm��xZ�s���>|�^��[7{��� %խ���w ��+�9N�s�e�@!gy/��U���b;�F�C���\�~=CPc�MU*��A�p��xC�k6��s;�`�b<�
����j��V��@��Q���>ĥ�C��rl�>�'ԠO��p��U����{g}0ڞk�*Z'U�ƪ6vmb
w9�u7\`�M�>A �}�V�	c*J�u!V��p���
Ά�=]�}H��#_�ZH�'/���������I-{]u4滞���庼I���n���T pV��Є��]a�_�Y8a#���T��Ƃ��u�a�o������7�~i��`�]쯕��@y�t[�:��(�s'�wx�)���V.��(xw��w�$��_����ݔG�kț�Xޛ12C���r� �!���|�qPԽ�A�$N2ߐ�""�N"��s�8.�R��5"���^Eݢ�����WAM�o(��"�JYRZZP�(���}+?��	�y�<�N�}Ⱥ�M���1��2���If�����c��{��!I>.{az���)f�n�P���Eqr@�Q9�&Ͼ��ܨф�/P��XTJ�V�gA��@X?���!��:�iK
nX�$�Jʸ�����1���q9�L�o�-��<�������{_$��"������h��C잂r���@��+��32�އKa�.1�=EĸL� �Qپ8�*^R6a�b`��vN��e�ǹ��%����dE/7�J��z���e{<N>Y��m1�2ϱ��� �{����k���r��`�,�h"�w��c���_+�E3�߯-^�+Ic�C%,cV�z�m��'��~yQ�Q�Y�����"�����L��X��:�&�:w5]�9(Р�r���&�$�Y(`��X�,(�wR�(�9vv�����K��qo&��.&]���Jf�1�H�S�,�̡�#�8&e��6�dr�10^9=)��z�+�B&8s~�V"�tbpҔ�2]Lʔ=�xT��tF_��Rb
�C�P�Lk��W���̜�Oٗ�5�z������Y�i�ފ��D��K̤����L����?����㭓�9䢕�D4���c�8k!<#���ф���ѫ�L懞��NQ�sl�l�ʙdG�����?7����n���{�!r^���d�]7�wN�IЄ���5�;����W��rP�aU�m���ڄ0U=G��?��P��k�Cұ�]��G���@�L��sp��oxܐ��<t�B��f�n�Z=M����O}v|Z*�\���'T�V��гg���a��/���=PT�C�a��,7�U�$�l�U� v&���s���O��'da�n���Vzi�%4'F��暔#{P�9;�Y'>� =�7���7�u���%h���U0��
m��z��s���Cuњ�C���l7'Y~�x���U�0�ja`��S�벛Sqm�v����y�s��VJTފ��$-Qv68h�.g�����~�=IrD�����<� ��Ɨ���u�'�iVz���i��v��7�
���ꛔ�>���V�*��-Ɲ�&CyFNX[���s�mIy��6Ayr2M�`\��-�?��'��=o�-/�g+����Ƹ����-��������9s���հ�Y�懶�hW�h��㤔�lm��<��3U��ռO���X�A2زt��	�iE9/[��V�	p}�E��[���0�,'y���
��ފ��NXc�'�b�	b��V��㬓Ѵ(��t�O��򜰓}1���M�@'j�0���>��V�q�PP�x5��x��u=hŢԓw���}?��:��#�+�Ahw�l�V�N����
^���RKƕ�y�����:)�V�������zy��B��'���W��>h_'Y����"9pg?#�1P_p����9`�㲭��V�K��%�d�!�j*k�8�Y9�R�o{0��cb�W���E�������\�|K�#���m�9��-��,��ۜ/�,�+!g�����
yR&Z��I�^�� F�\���F`��´�Q[t��ܙ�b��Fk�Ŗ���֫&C��~o��7���|4���L�!7.._���_',�E��z�hs��@j�w��r�VatD_�,��㬰'�y-�62���7]1>z j{��������}��ҁs7�A��ު=Vߓ݄���-��ܷ(����}�/�N�$6�V|�9�0���H�i�w��`_����ز�$�­���6=4rX|+�g�*��W߃���{��}�/يv�7�Z;	[��v='j�����Wx ��eW~6*gV1HP�����+t�N�E�{�R\%�:�����n�3��]���6�UX��������\v�/V�2�]�EP�6K��T�&A�a{��H��`��J9�կ����݅Q�����3����|�/�9���X��/Q���W���t��Ħ	'���\�$��!@</�}(-5&<��:���G?:}-����+�-Ќ=��Y(4�JAP���gL�e�lE��xg��N�;'��|�G�W��}���}�&A���� I_flI0��.�r�/�K�D�l����%�U�����+�Bp;Nc�K��G�su｟<���0Fy��2!��]� L)��jČ����1c5CI��������4M�l(px�&"sW�I�Խ����R��<P���s%�x�M��i)�Z=��km�Ed��O=�@��Z�Q2y[�����Z�z��S��~��F�vH��ȯ���k%�W*i>�_k{��4o� ����K��K�{]�sS�׼��7p~͘��ۺ0'��)gl��w�T�<�_����i9�����-��N
5-�6
RSTsY���BC���^/�ƶ�ݝd-�{RB��Z�N�[zZ*�#}I�    r�	ɯq�O���b�*CſV�������ɗZ�����0�[��xm��}��g޷B�q=_�
����C{�l9�����w�>�J��lEz�V�x�-Ƚᓐ�M����o&���v^��r����>�t~�7��A	�j���S��qZ%�>33O������b�����gg'��_K�
�A��s'��CJ`]�x�{���m��8���_��؇��yZ=]�jR��,�#�}�8^�1��j}��<Z��x�-���\�!5�]|�a���]͸��O�"�Z��x字0�uQ+$Kϩ�N,|<��iY����W�ۙ٪Ĉ���G2��"��1{!�zݚ���sL�V;��cR�9~�c�<���|突xk^�3��O�椉�i�d�=�������	���S[H>�����P��U)�J��C*��;��P��XXݎPZ���O��$$�pӲ��՚q��$	:Q�+S�{��\���է �pf��m���l\QZ���$uЏH#"�{!*ށG�b~�~D��/�)E޷���y뻶�m���|b�n����޹��h�q�B��ҷV�����r=����]>v-���!9�A!YeC�\�W�5J��$����|f�H�M����ocf�9T|�(�i�R��Y��`�?<���k�e`0�g����2P�H���͸��vf�q'�&ܢ�P��	�Z�����
R���xH1z�b�!��mص#��������m�d�=�<��<��˄�D�� ˀ�Z%Y2�v�0���Z��'�6����k�����,�{H��� �y�D%H�{���w갨�$����xj����rx����z������@��MƦ�	�QfaF�9x���:����
�_IM>�<��.��g��<����eH���<w_��u�{�(n�*�L$TYףf���Ҧ%���l�����c��·����������|�L��"޺A�e�B�2���� ����1��ٛ��������s�0lN+#K/�Y������)c<*�r8n���(�p4k؞C���'�"a-0o委=B��ܐ����k�~~m�T��w?�ĥ�J!S$d�z�6�0δ*ʊ��t�:��a��lK�A=;��JO�P�AB8�)+#ې�$����{}j���"�rV-��ݢ�_�s4]�L�t�z؟��68��ՑE�	Ԩ�B:�G��d�f��Ŏ��b�����c<`� �2���$*>�wl�(0�qH�,�VF�^eʯ�w�q�ɺ<ЊN�QVF��@���lgAn�6�%�4k���>}��:���F��G�T[�U��j�?������)����w�I���@�VE���n�)G�U��q��c<D�ފ:<�%��N3�uxV<S�J�$|�uQ_r�v~�/5��G���a�]}�`�'�~66�6�}޾V3d��1�����U��,���Eb\�9>�w�2��X[�(@=��О�l���T'��W��Ύm���A�˯M��0&�^�W�U�m��a�O�#.�-3짺�܊������O �P/B��[0�q�9(�ي�wT?rX�n�2�VDv��YѪ���wEda+�Vw�����Ii� �̓��}�I#$�����ѽiű��C<$7�Z�#�lU��CTOAéƸ,M�i��?�H�0@A5P?&�Ր%�jF�M�\���B�ZY"�}L�wm�4y��*H�����\�:H���d�8GXl�Ɗe��3S<�L����	IJW����_��g�}~��-^+"KF֌IJ�n�"����[��a�ָ]�7:{�{��l����,b`� �#42�����,ڊIi�t=�_�V6�������􋳯�AP7���	,N�YدqaPo��U_���ܴ�X �^!�<�vaC+��ۙ��7^\np��X9�^�4B��.L'�~+�x�mdQe��S;�-���wn�P)����9V��l�oG��O ׉���ƳfY�^��/�6h�=vWrYA��l����a��1Yb���|�fY����D5�WF�Na�/���%I�CT2/r��F�{�QB���l�_�'�"ĝ?��4[�A�d�ȑk�����8�u)�È��Z��l�~,
�����	XN�����뚠"�P�b�+��U���6��娩-L��QV�P����=KX4�r7v�ɿ �|��( ��L�ź��d����q���eZ�`d+.�	�v
�zZ��\X��M�+Fx�L�V�A�:�y
�I��E�gh�V6�.��,-�%n�B<G3{�"���	����6i����I>���%��l��O\4�� �v�{ln�t<Q���w���c�˼o%0 ��6ش��i��=:��eI���"��t_1%g�!��f����h�&Q� �0Z��	��U�u�J���ۅhu��x��VY����"�:lr�!����f�!ې���BK)X���S���*�pC��#tV�=�6�eb�A�К��*�}�����ɂ*p��
Ȳz�Ѭ�,����F���E����<胕�%.���]҈���3����s[	Y�����R�)t��<>0l|�YڸB1��9����=Gɴ1o���^����?Hx��4m^d$<�]M�5+�S�W��,������ 3ӵ��\���E��ݙ�q����C[�B�,�A(��K	�J��wx�/�Zw +6mu��B�.Vta�F	Y��؞�hj)�C�e���6:'��6+�p-ھ_ە���8�����9v�U���i�y��}f��i	`��%c @��VCv �h�MkU�2���~�Ļˈ�y(Y�S{䡐�������e����>�J+"[a���R���I�_W�@�Y�D����#P:�H�6]:�!�����帓��KY��F8��N`�j�R�`G��ؕ1��p�2(��j�^�Ro�Kf|m�\����4�J�R��{wDs��^� �L����	���Y(�z%�����ǌ+��5g��'���W������8��֟1B�ːu��'W�����9�S�Lٓ)d5d	���h�
�;�y�1>�"'-���6c~��^`������s[8j��>��[	��i5dɺ~�iy��s�ρzgM��E�/%O�T��g��Q��*9c��C��˲>��%QC��{�Ns<�%=��\�rP�a��4Hv�xL��W�^Ȃ���a��,��5Fh�RMίI������ɐ�s���"6�*]�3^Bq��m��'����V%4!W�.4=�2&vpw ���,�v��]��jjԵ�0M��hV�ܲ98rC��,X��@��b�ZY2�� v'�3��欯����΋%Op��W��o�ՐŴ�8�Q乲B����l����Q+!KyM;Z/���u���63�(��`ɸ!���"��w�M�b8�C
[�VC��}� Jr5��!W����FQ�����<�KԐ���a�����C6њW���'�Q+!K^l����㴯}��Y�}M��DD��v���4t��;����`3���b�+v���*��(E�VA�J���r�؝Z9��0�q�8�zE��/�&���
��*��0��O[kT�%�c#�B�Yη��>��U�E���B�x�(����PXtQA��6��6(����l����e��_	�!�F/����~�A��-��u�?�3���-r��ogh28��l���$^�����3C�+�~V+ ��{hI+ ���d<bѧ �+A6I��R<�&1:	�0*��,�~��s%�y�EFO2�g��/m�r�}b����c����E�G�ۗ���ɾ�m���9��i�wq%�(>�1D�*�R�$G��;���	YYN`w�l%d�  t��I�Scu�1���.�}]xp�b�t,N�r�}rCYc��IT[�`H�9L�Jc72M�̲
�������O�RZ�7�e�F�Y�ef)�5�F���G�O7O=���P����,�@e��,eN�a0�)m�p�1�H� �J5n9Ͳ��r�4���PVA��c#佀ޔ�}���M�M��v�kޗ/=�<�2I���dd�U0)�s�N� 5  �ypW�l��M�[.g��\y%6_�X.V�wή{� e�<�J�q���؅�їsH�-����ѣ��- g�{'��>�h��ژJF|��k�Ldd	P1yY�G��,le�T匶�df+tȡ6��,�i."fc��l���fk4�Hܙ��������U@5VAV�� �Q� ���\��]ᑷ��.$e��;�;��^B?觳�*��皋O�H�5�d�	���*i����2ixp�o���L�vNc(���(��G����=�~t#�6Ǹ=y��s�w=���~9�xr���:&�yS	t:}+#aFFY��उ CV\T�!�SK3��j����qy�fc8FX����/rOl�}��xʃUYR�ٯ�Pfˊ�W��L���Ѫkr4 -O��[�5�J澮��Զ0Ä���xX�ܮ�$�*ؘ����o��3�$ϯ�|������"�U��":%da'��XE�3X�>d�������QB�P=o졕a��V|m��s�7N�ۇ(!���V������	�}9���Fvl�t��'Gَ�ON ��w=W����ԡ��ccn�w�|[���v)[�a$-e�2�ǥ�"�SV''�ъ�Rd/�����*m�t���۪�B�b�*ݯ���JnPea�i����T�r=�0rօ���Z������.��t�z	ˠ�?Y�Al��W%�����Rh��*�9��.�E�3W.�cj��pA��� ��D�Sj����岐`�K��Ѯ$���:"{���꘾}�կ��K}�$��^������\�5���{�wu����(�qFC���ɇ2�ۣ.޷=��iudL�X��$yʪ1IK՜[(��qa�)���\�<�2HR�D�؀�J�M��׌_���ס1���	R��ѫX�\9��U��L	���ŽL���r]�xJ�P
��n�d18Oyu�S'i���\xkM�VJ��#��&G/ߵ���t�-�5o�υT�g�a��86�U�Qs�Z����oPݞ��7�Ï7�6C�q̛RPN��jɢ)��.���}�i��6I�b�%K�{�9\��z�N��5ZÎs������w�CMmᬯ�[��,��<��"OM�*ɒ�4c�;1�D3�_%�̖I4,9�ER8,�-L������
�T(��P}0Y3 Q�${�I��e���� ������/R��K�^z.(Mѡ�W��*�^%�l�z��5�^�l�!*�F�ܱFl��vǮW$D��|�nD��{~mST*'�
�I��Z�ۑVJ�Z�Z�VK��Q��ܘ��Zg���0�\�Q��k&�����j��m\
�ԋ݅q��C��������s��j�
k?��R��V�ǵi�=}^^D�O_��St\������D�e_�s��U8*t\�.��K����(	�j���y�E�..zF-Y�:l��
b��F�!&C����2��(&�6�/BIA5)�� �{NrB+�j�t�$$�|���R�����0��º�j�^x{N2�lS����l�+|��pً���u�r�R�/��u���q��X��ܨ�&[@d�����i|�G�j�n��l����@���4�s�wC"�����%5�*Oԓ%m��j)�\=�|kԓ�|v���v^��V��6�S��IE�دVO�g4�0�R��j)��k��Q\^�"�5o�}5�VO� ��3���J�VO�*��#pʞˤj�d�{��y�d������"�M��k�4�L���^\7}\UV�qr�j<wB���s��<zvX�s%Ux+��X�.�9sf����5* ���B�7I�_%��ܽ/�;�����j�d�I+AS��K8���I;y�P��ĭQO��q��A������������      [   �  x�}VI����~�7�k��CZ�J�e�e�z�@B#��N���ԭ��$9q�s�}v��V�����0���b�{��$�Y��q��pp��� ���8��v�kh���1A G�� ?����p�hW������(6�������
� #?j�mN��گ�E�R_�ƺ�*�;o6AIR?ʝ��"U�|,���'��p���C��FFWQ�,�n
�X�cr�����8B)NSߪ@�<I�
��#7��$�����`'�y�`��4�i�>!�)�ȧ�W��+Z(A+��;�����2X�g���<!i��r+`�����p|\�#Lw��	5a	�HK�OCV�������������c�.��.m=�i��ƍ1Tl+#�I�W2g�����q��vL�D{߳�I�e�
a7�e�	X�E��]u��X@���I�q<��>��%��A�V��b��g�zr��`п�]�@	�PN�=H(YRpſM^ɩ�)������ؠ���)�<��G�q�\e[�.(^ҢN��#�~(�Y�	���H ��t��-��<�_��`]Xhز|p�CZ���Ӑ˯�q�F�<�o�����b4V�N�8��4J�����Y#G���޺ �J�R�Q�QF#=��B[�����xٖ3�.xH;��0�UQ	��V ������I��D<���g��Y�0�0��k���ջ)X���vQPs/m1"U�y~(��\��-�,sp�@ӳ���%�&�G��-2 �fkD�w���j�a��Gߐ��;�q�CHyOH��#��S_3����'6��������Ӝ2��U��pX'nTm�-hl=Qq�xSX��_u��i�
���>��mz	�`�-����i�>MI)l�
����(����
�Oito耬v�+E�f��@�{烝}�T�akt)��F��/Fqt�@R��7�,*
$`Ӕ�"��]V�FXa��;��z�&�gz(���%KS�0ÆͤM>�*��3j��1�ͪ��uKhT*h�"����'a����'���/��%����tO�:�@�}�<�4�3h3�`n��y��
�X�J��	���o_�&�'�	F_"��?]���m�mz�Uֆ���1��33�[ԓ��ݗ�4��Wx��K�;/)}���C��ND����L��I~�^q�>�U�B���L�qu�e��)����p�Mz,��|+^,�!D��3�'x���Esby������\�CG;U�q��2���6��em���u���p�	��dY��[w��$�}�*�R�-��>��u�N1ڎ��I:g����v2=_����l���X}��{�������-�!Ur/�����(�K�z����XL�L�V��`͵j=�\���T[_�� ��DS��G���2�y��:Q�k���??��V��W��>*�s	/��"�����2b9���N���PV�2C�v�T�@�����᧻�����)��q�՛qKg;v��]����0xϋ5?��e��KQ6x��>j"�ئ���/k���'��}>S��]
b�|��t9�4|���<hZ�({3A�_�;#��s������k�~�{_-V�vxc����Q ��qQ�[=�\c�i4]%�G]�u��v�'7%��卞�^�Yi/�wj�J�����.�$���f���Rm��n�A|?��*����eF ��j&�W
���ϻ3�;�3c��~����j2'�7#s�gb���Ύ�Ֆ[�CgI+�)�����/����pO�yZ�jm,��������6Ԥc�!��{97�$2��*1VǮ3�uv�	�_��y4j�q��ȸ��WWf����0HV\iC��F�z/W�ag4���1��V_����2������=]|��K�p޼�|lW}}QN�I�'����1����2>�n�"p �}[~���7	�g/FN}A��>��$5�;�5DS�&����S@�B���c����zh�[     