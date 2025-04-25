--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1)
-- Dumped by pg_dump version 17.4 (Debian 17.4-1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE pwd_game;
--
-- Name: pwd_game; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE pwd_game WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C.UTF-8';


ALTER DATABASE pwd_game OWNER TO postgres;

\connect pwd_game

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: fav_comic; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fav_comic (
    user_id integer NOT NULL,
    publisher character varying(60),
    "character" character varying(60)
);


ALTER TABLE public.fav_comic OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(40)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: fav_comic; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.fav_comic VALUES (1, 'DC', 'The Question');
INSERT INTO public.fav_comic VALUES (2, 'Marvel', 'Reed Richards');
INSERT INTO public.fav_comic VALUES (3, 'Image', 'Invincible');
INSERT INTO public.fav_comic VALUES (4, 'DC', 'Phantom Stranger');
INSERT INTO public.fav_comic VALUES (5, 'Marvel', 'Wolverine');
INSERT INTO public.fav_comic VALUES (6, 'DC', 'The Joker');
INSERT INTO public.fav_comic VALUES (7, 'Marvel', 'Dead Pool');
INSERT INTO public.fav_comic VALUES (8, 'DC', 'Wally West');
INSERT INTO public.fav_comic VALUES (9, 'DC', 'Damian Wayne');
INSERT INTO public.fav_comic VALUES (10, 'DC', 'Wonder Woman');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'Kirrily');
INSERT INTO public.users VALUES (2, 'Henry');
INSERT INTO public.users VALUES (3, 'Alinta');
INSERT INTO public.users VALUES (4, 'Ava');
INSERT INTO public.users VALUES (5, 'Tarka');
INSERT INTO public.users VALUES (6, 'Charlotte');
INSERT INTO public.users VALUES (7, 'Jirra');
INSERT INTO public.users VALUES (8, 'Isla');
INSERT INTO public.users VALUES (9, 'Birrani');
INSERT INTO public.users VALUES (10, 'James');


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 10, true);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: fav_comic fav_comic_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fav_comic
    ADD CONSTRAINT fav_comic_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

