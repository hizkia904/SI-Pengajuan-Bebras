--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2025-02-06 23:24:29

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--




--
-- TOC entry 5047 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 952 (class 1247 OID 57412)
-- Name: non_empty_text; Type: DOMAIN; Schema: public; Owner: -
--

CREATE DOMAIN public.non_empty_text AS text
	CONSTRAINT non_empty_text_check CHECK ((length(VALUE) > 0));


--
-- TOC entry 984 (class 1247 OID 328827)
-- Name: bagian_soal; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.bagian_soal AS (
	task_title public.non_empty_text,
	answer_type public.non_empty_text,
	keep_order boolean,
	body public.non_empty_text,
	question public.non_empty_text,
	answer_options public.non_empty_text,
	answer_explanation public.non_empty_text,
	this_is_if public.non_empty_text,
	this_is_ct public.non_empty_text,
	if_keywords public.non_empty_text,
	ct_keywords public.non_empty_text,
	wording_phrases public.non_empty_text,
	comments public.non_empty_text,
	graphics public.non_empty_text
);


--
-- TOC entry 928 (class 1247 OID 57416)
-- Name: content_task_bank; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.content_task_bank AS (
	task_title public.non_empty_text,
	body public.non_empty_text,
	question public.non_empty_text,
	answer_options public.non_empty_text,
	answer_explanation public.non_empty_text,
	this_is_if public.non_empty_text,
	this_is_ct public.non_empty_text,
	if_keywords_websites public.non_empty_text,
	ct_keywords_websites public.non_empty_text,
	wording_phrases public.non_empty_text
);


--
-- TOC entry 925 (class 1247 OID 57505)
-- Name: content_task_proposal; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.content_task_proposal AS (
	task_title public.non_empty_text,
	body public.non_empty_text,
	question public.non_empty_text,
	answer_options public.non_empty_text,
	answer_explanation public.non_empty_text,
	this_is_if public.non_empty_text,
	this_is_ct public.non_empty_text,
	if_keywords_websites public.non_empty_text,
	ct_keywords_websites public.non_empty_text,
	wording_phrases public.non_empty_text,
	comments public.non_empty_text,
	graphics public.non_empty_text
);


--
-- TOC entry 956 (class 1247 OID 57611)
-- Name: review_task_proposal; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.review_task_proposal AS (
	task_title public.non_empty_text,
	age public.non_empty_text,
	answer_type public.non_empty_text,
	categories public.non_empty_text,
	body public.non_empty_text,
	question public.non_empty_text,
	answer_options public.non_empty_text,
	answer_explanation public.non_empty_text,
	this_is_if public.non_empty_text,
	this_is_ct public.non_empty_text,
	if_keywords_websites public.non_empty_text,
	ct_keywords_websites public.non_empty_text,
	wording_phrases public.non_empty_text,
	comments public.non_empty_text,
	graphics public.non_empty_text,
	authors public.non_empty_text
);


--
-- TOC entry 959 (class 1247 OID 81979)
-- Name: template_bebras; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.template_bebras AS (
	task_title public.non_empty_text,
	age public.non_empty_text,
	answer_type public.non_empty_text,
	keep_order public.non_empty_text,
	categories public.non_empty_text,
	body public.non_empty_text,
	question public.non_empty_text,
	answer_options public.non_empty_text,
	answer_explanation public.non_empty_text,
	this_is_if public.non_empty_text,
	this_is_ct public.non_empty_text,
	if_keywords public.non_empty_text,
	ct_keywords public.non_empty_text,
	wording_phrases public.non_empty_text,
	comments public.non_empty_text,
	graphics public.non_empty_text,
	authors public.non_empty_text
);


--
-- TOC entry 918 (class 1247 OID 57482)
-- Name: type_difficulty; Type: DOMAIN; Schema: public; Owner: -
--

CREATE DOMAIN public.type_difficulty AS character varying(6)
	CONSTRAINT type_difficulty_check CHECK (((VALUE)::text = ANY ((ARRAY['EASY'::character varying, 'MEDIUM'::character varying, 'HARD'::character varying])::text[])));


--
-- TOC entry 914 (class 1247 OID 57409)
-- Name: type_of_answer; Type: DOMAIN; Schema: public; Owner: -
--

CREATE DOMAIN public.type_of_answer AS character varying
	CONSTRAINT type_of_answer_check CHECK (((VALUE)::text = ANY ((ARRAY['Multiple-Choice'::character varying, 'Multiple-Choice with Images'::character varying, 'Open Integer'::character varying, 'Open Text'::character varying])::text[])));


SET default_table_access_method = heap;

--
-- TOC entry 225 (class 1259 OID 57376)
-- Name: biro; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.biro (
    id_biro integer NOT NULL,
    nama character varying(100) NOT NULL,
    CONSTRAINT biro_nama_check CHECK ((length((nama)::text) > 0))
);


--
-- TOC entry 224 (class 1259 OID 57375)
-- Name: biro_id_biro_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.biro_id_biro_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5048 (class 0 OID 0)
-- Dependencies: 224
-- Name: biro_id_biro_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.biro_id_biro_seq OWNED BY public.biro.id_biro;


--
-- TOC entry 229 (class 1259 OID 57402)
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id_categories integer NOT NULL,
    nama character varying(100) NOT NULL
);


--
-- TOC entry 228 (class 1259 OID 57401)
-- Name: categories_id_categories_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_categories_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5049 (class 0 OID 0)
-- Dependencies: 228
-- Name: categories_id_categories_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_categories_seq OWNED BY public.categories.id_categories;


--
-- TOC entry 241 (class 1259 OID 57576)
-- Name: categories_soal_usulan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories_soal_usulan (
    id_categories_soal_usulan integer NOT NULL,
    id_soal_usulan integer NOT NULL,
    id_categories integer NOT NULL
);


--
-- TOC entry 240 (class 1259 OID 57575)
-- Name: categories_soal_usulan_id_categories_soal_usulan_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_soal_usulan_id_categories_soal_usulan_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5050 (class 0 OID 0)
-- Dependencies: 240
-- Name: categories_soal_usulan_id_categories_soal_usulan_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_soal_usulan_id_categories_soal_usulan_seq OWNED BY public.categories_soal_usulan.id_categories_soal_usulan;


--
-- TOC entry 235 (class 1259 OID 57529)
-- Name: gambar_soal_usulan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.gambar_soal_usulan (
    id_gambar integer NOT NULL,
    id_soal_usulan integer NOT NULL,
    path character varying(100) NOT NULL,
    file_name public.non_empty_text NOT NULL,
    CONSTRAINT not_empty CHECK ((length((path)::text) > 0))
);


--
-- TOC entry 234 (class 1259 OID 57528)
-- Name: gambar_soal_usulan_id_gambar_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.gambar_soal_usulan_id_gambar_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5051 (class 0 OID 0)
-- Dependencies: 234
-- Name: gambar_soal_usulan_id_gambar_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.gambar_soal_usulan_id_gambar_seq OWNED BY public.gambar_soal_usulan.id_gambar;


--
-- TOC entry 249 (class 1259 OID 65536)
-- Name: info_bebras; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.info_bebras (
    tahap_sekarang integer NOT NULL,
    deadline_tahap1 timestamp with time zone NOT NULL,
    deadline_tahap2 timestamp with time zone NOT NULL,
    deadline_tahap3 timestamp with time zone NOT NULL,
    deadline_tahap4 timestamp with time zone NOT NULL,
    deadline_tahap5 timestamp with time zone NOT NULL,
    deadline_tahap6 timestamp with time zone NOT NULL,
    deadline_tahap7 timestamp with time zone NOT NULL
);


--
-- TOC entry 267 (class 1259 OID 246919)
-- Name: non_registered_author; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.non_registered_author (
    id_pembuat_soal integer NOT NULL,
    id_soal_usulan integer NOT NULL,
    peran character varying(11) NOT NULL,
    nama character varying(50) NOT NULL,
    email character varying(320) NOT NULL,
    id_biro integer NOT NULL,
    CONSTRAINT non_registered_user_email_check CHECK (((email)::text ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'::text)),
    CONSTRAINT pembuat_soal_usulan2_peran_check CHECK (((peran)::text = ANY ((ARRAY['author'::character varying, 'editor'::character varying, 'contributor'::character varying])::text[])))
);


--
-- TOC entry 243 (class 1259 OID 57593)
-- Name: pembuat_soal_usulan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pembuat_soal_usulan (
    id_pembuat_soal integer NOT NULL,
    id_user integer NOT NULL,
    id_soal_usulan integer NOT NULL,
    peran character varying(11) NOT NULL,
    CONSTRAINT pembuat_soal_usulan_peran_check CHECK (((peran)::text = ANY ((ARRAY['author'::character varying, 'editor'::character varying, 'contributor'::character varying])::text[])))
);


--
-- TOC entry 266 (class 1259 OID 246918)
-- Name: pembuat_soal_usulan2_id_pembuat_soal_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pembuat_soal_usulan2_id_pembuat_soal_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5052 (class 0 OID 0)
-- Dependencies: 266
-- Name: pembuat_soal_usulan2_id_pembuat_soal_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pembuat_soal_usulan2_id_pembuat_soal_seq OWNED BY public.non_registered_author.id_pembuat_soal;


--
-- TOC entry 242 (class 1259 OID 57592)
-- Name: pembuat_soal_usulan_id_pembuat_soal_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pembuat_soal_usulan_id_pembuat_soal_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5053 (class 0 OID 0)
-- Dependencies: 242
-- Name: pembuat_soal_usulan_id_pembuat_soal_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pembuat_soal_usulan_id_pembuat_soal_seq OWNED BY public.pembuat_soal_usulan.id_pembuat_soal;


--
-- TOC entry 237 (class 1259 OID 57543)
-- Name: rating_internasional; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rating_internasional (
    id_rating_internasional integer NOT NULL,
    id_soal_usulan integer NOT NULL,
    name character varying(100) NOT NULL,
    as_for_now integer NOT NULL,
    potential integer NOT NULL,
    CONSTRAINT non_empty_name CHECK ((length((name)::text) > 0))
);


--
-- TOC entry 236 (class 1259 OID 57542)
-- Name: rating_internasional_soal_usulan_id_rating_internasional_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.rating_internasional_soal_usulan_id_rating_internasional_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5054 (class 0 OID 0)
-- Dependencies: 236
-- Name: rating_internasional_soal_usulan_id_rating_internasional_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.rating_internasional_soal_usulan_id_rating_internasional_seq OWNED BY public.rating_internasional.id_rating_internasional;


--
-- TOC entry 248 (class 1259 OID 57632)
-- Name: rating_nasional; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rating_nasional (
    id_rating integer NOT NULL,
    id_user integer NOT NULL,
    id_soal_usulan integer NOT NULL,
    as_for_now integer NOT NULL,
    potential integer NOT NULL,
    time_stamp timestamp with time zone NOT NULL
);


--
-- TOC entry 247 (class 1259 OID 57631)
-- Name: rating_nasional_id_rating_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.rating_nasional_id_rating_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5055 (class 0 OID 0)
-- Dependencies: 247
-- Name: rating_nasional_id_rating_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.rating_nasional_id_rating_seq OWNED BY public.rating_nasional.id_rating;


--
-- TOC entry 246 (class 1259 OID 57613)
-- Name: review_nasional; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.review_nasional (
    id_review integer NOT NULL,
    id_user integer NOT NULL,
    id_soal_usulan integer NOT NULL,
    review public.template_bebras NOT NULL
);


--
-- TOC entry 245 (class 1259 OID 57612)
-- Name: review_nasional_id_review_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.review_nasional_id_review_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5056 (class 0 OID 0)
-- Dependencies: 245
-- Name: review_nasional_id_review_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.review_nasional_id_review_seq OWNED BY public.review_nasional.id_review;


--
-- TOC entry 233 (class 1259 OID 57507)
-- Name: soal_usulan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.soal_usulan (
    id_soal_usulan integer NOT NULL,
    uploader integer NOT NULL,
    who_last_updated integer NOT NULL,
    last_updated timestamp with time zone NOT NULL,
    tahun integer NOT NULL,
    status_nasional character varying(18) NOT NULL,
    gotointernational boolean DEFAULT false NOT NULL,
    status_internasional character varying(18),
    review_internasional bytea,
    archived boolean DEFAULT false NOT NULL,
    soal public.bagian_soal NOT NULL,
    CONSTRAINT answer_explanation_not_null CHECK (((soal).answer_explanation IS NOT NULL)),
    CONSTRAINT answer_options_not_null CHECK (((soal).answer_options IS NOT NULL)),
    CONSTRAINT answer_type_not_null CHECK (((soal).answer_type IS NOT NULL)),
    CONSTRAINT answer_type_value CHECK ((((soal).answer_type)::text = ANY (ARRAY['Multiple-Choice'::text, 'Multiple-Choice with Images'::text, 'Multiple-Select'::text, 'Multiple-Select with Images'::text, 'Dropdown-Select'::text, 'Open Integer'::text, 'Open Text'::text, 'Interactive (Click-On-Object)'::text, 'Interactive (Drag & Drop)'::text, 'Interactive (Other)'::text, 'Other'::text]))),
    CONSTRAINT body_not_null CHECK (((soal).body IS NOT NULL)),
    CONSTRAINT ct_keywords_not_null CHECK (((soal).ct_keywords IS NOT NULL)),
    CONSTRAINT if_keywords_not_null CHECK (((soal).if_keywords IS NOT NULL)),
    CONSTRAINT keep_order_not_null CHECK (((soal).keep_order IS NOT NULL)),
    CONSTRAINT question_not_null CHECK (((soal).question IS NOT NULL)),
    CONSTRAINT status_internasional_check CHECK (((status_internasional)::text = ANY (ARRAY[('IN REVIEW'::character varying)::text, ('IN REVISE'::character varying)::text, ('WAITING FOR RESULT'::character varying)::text, ('ACCEPTED'::character varying)::text, ('HELDBACK'::character varying)::text, ('WORK NEEDED'::character varying)::text]))),
    CONSTRAINT status_nasional_check CHECK (((status_nasional)::text = ANY (ARRAY[('SUBMITTED'::character varying)::text, ('IN REVIEW'::character varying)::text, ('IN REVISE'::character varying)::text, ('FILTERING'::character varying)::text, ('ACCEPTED'::character varying)::text, ('REJECTED'::character varying)::text, ('ADDED FROM ARCHIVE'::character varying)::text]))),
    CONSTRAINT task_title_not_null CHECK (((soal).task_title IS NOT NULL)),
    CONSTRAINT this_is_ct_not_null CHECK (((soal).this_is_ct IS NOT NULL)),
    CONSTRAINT this_is_if_not_null CHECK (((soal).this_is_if IS NOT NULL))
);


--
-- TOC entry 232 (class 1259 OID 57506)
-- Name: soal_usulan_id_soal_usulan_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.soal_usulan_id_soal_usulan_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5057 (class 0 OID 0)
-- Dependencies: 232
-- Name: soal_usulan_id_soal_usulan_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.soal_usulan_id_soal_usulan_seq OWNED BY public.soal_usulan.id_soal_usulan;


--
-- TOC entry 222 (class 1259 OID 57352)
-- Name: user_bebras; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_bebras (
    id integer NOT NULL,
    username character varying(20) NOT NULL,
    salt uuid NOT NULL,
    hashedpassword character varying(64) NOT NULL,
    nama character varying(50) NOT NULL,
    role character varying(12) NOT NULL,
    email character varying(320) NOT NULL,
    id_biro integer NOT NULL,
    ketua boolean DEFAULT false NOT NULL,
    CONSTRAINT check_min_length_nama CHECK ((length((nama)::text) > 0)),
    CONSTRAINT check_min_length_username CHECK ((length((username)::text) >= 5)),
    CONSTRAINT email_format CHECK (((email)::text ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'::text)),
    CONSTRAINT user_bebras_role_check CHECK (((role)::text = ANY (ARRAY[('ADMIN'::character varying)::text, ('BIRO'::character varying)::text, ('TIM NASIONAL'::character varying)::text])))
);


--
-- TOC entry 221 (class 1259 OID 57351)
-- Name: user_bebras_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_bebras_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5058 (class 0 OID 0)
-- Dependencies: 221
-- Name: user_bebras_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_bebras_id_seq OWNED BY public.user_bebras.id;


--
-- TOC entry 223 (class 1259 OID 57359)
-- Name: user_session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_session (
    id text NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    user_id integer NOT NULL
);


--
-- TOC entry 227 (class 1259 OID 57395)
-- Name: usia; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usia (
    id_usia integer NOT NULL,
    from_age integer NOT NULL,
    to_age integer NOT NULL
);


--
-- TOC entry 226 (class 1259 OID 57394)
-- Name: usia_id_usia_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.usia_id_usia_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5059 (class 0 OID 0)
-- Dependencies: 226
-- Name: usia_id_usia_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.usia_id_usia_seq OWNED BY public.usia.id_usia;


--
-- TOC entry 239 (class 1259 OID 57557)
-- Name: usia_soal_usulan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usia_soal_usulan (
    id_usia_soal_usulan integer NOT NULL,
    id_soal_usulan integer NOT NULL,
    id_usia integer NOT NULL,
    difficulty public.type_difficulty NOT NULL
);


--
-- TOC entry 238 (class 1259 OID 57556)
-- Name: usia_soal_usulan_id_usia_soal_usulan_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.usia_soal_usulan_id_usia_soal_usulan_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5060 (class 0 OID 0)
-- Dependencies: 238
-- Name: usia_soal_usulan_id_usia_soal_usulan_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.usia_soal_usulan_id_usia_soal_usulan_seq OWNED BY public.usia_soal_usulan.id_usia_soal_usulan;


--
-- TOC entry 4779 (class 2604 OID 57379)
-- Name: biro id_biro; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.biro ALTER COLUMN id_biro SET DEFAULT nextval('public.biro_id_biro_seq'::regclass);


--
-- TOC entry 4781 (class 2604 OID 57405)
-- Name: categories id_categories; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id_categories SET DEFAULT nextval('public.categories_id_categories_seq'::regclass);


--
-- TOC entry 4788 (class 2604 OID 57579)
-- Name: categories_soal_usulan id_categories_soal_usulan; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories_soal_usulan ALTER COLUMN id_categories_soal_usulan SET DEFAULT nextval('public.categories_soal_usulan_id_categories_soal_usulan_seq'::regclass);


--
-- TOC entry 4785 (class 2604 OID 57532)
-- Name: gambar_soal_usulan id_gambar; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gambar_soal_usulan ALTER COLUMN id_gambar SET DEFAULT nextval('public.gambar_soal_usulan_id_gambar_seq'::regclass);


--
-- TOC entry 4792 (class 2604 OID 246922)
-- Name: non_registered_author id_pembuat_soal; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.non_registered_author ALTER COLUMN id_pembuat_soal SET DEFAULT nextval('public.pembuat_soal_usulan2_id_pembuat_soal_seq'::regclass);


--
-- TOC entry 4789 (class 2604 OID 57596)
-- Name: pembuat_soal_usulan id_pembuat_soal; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pembuat_soal_usulan ALTER COLUMN id_pembuat_soal SET DEFAULT nextval('public.pembuat_soal_usulan_id_pembuat_soal_seq'::regclass);


--
-- TOC entry 4786 (class 2604 OID 57546)
-- Name: rating_internasional id_rating_internasional; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rating_internasional ALTER COLUMN id_rating_internasional SET DEFAULT nextval('public.rating_internasional_soal_usulan_id_rating_internasional_seq'::regclass);


--
-- TOC entry 4791 (class 2604 OID 57635)
-- Name: rating_nasional id_rating; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rating_nasional ALTER COLUMN id_rating SET DEFAULT nextval('public.rating_nasional_id_rating_seq'::regclass);


--
-- TOC entry 4790 (class 2604 OID 57616)
-- Name: review_nasional id_review; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review_nasional ALTER COLUMN id_review SET DEFAULT nextval('public.review_nasional_id_review_seq'::regclass);


--
-- TOC entry 4782 (class 2604 OID 57510)
-- Name: soal_usulan id_soal_usulan; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.soal_usulan ALTER COLUMN id_soal_usulan SET DEFAULT nextval('public.soal_usulan_id_soal_usulan_seq'::regclass);


--
-- TOC entry 4777 (class 2604 OID 57355)
-- Name: user_bebras id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_bebras ALTER COLUMN id SET DEFAULT nextval('public.user_bebras_id_seq'::regclass);


--
-- TOC entry 4780 (class 2604 OID 57398)
-- Name: usia id_usia; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usia ALTER COLUMN id_usia SET DEFAULT nextval('public.usia_id_usia_seq'::regclass);


--
-- TOC entry 4787 (class 2604 OID 57560)
-- Name: usia_soal_usulan id_usia_soal_usulan; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usia_soal_usulan ALTER COLUMN id_usia_soal_usulan SET DEFAULT nextval('public.usia_soal_usulan_id_usia_soal_usulan_seq'::regclass);


--
-- TOC entry 5018 (class 0 OID 57376)
-- Dependencies: 225
-- Data for Name: biro; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.biro (id_biro, nama) VALUES (1, 'Universitas Katolik Parahyangan');
INSERT INTO public.biro (id_biro, nama) VALUES (2, 'Universitas Kristen Maranatha');
INSERT INTO public.biro (id_biro, nama) VALUES (3, 'Institut Teknologi Bandung');
INSERT INTO public.biro (id_biro, nama) VALUES (4, 'Universitas Indonesia');


--
-- TOC entry 5022 (class 0 OID 57402)
-- Dependencies: 229
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.categories (id_categories, nama) VALUES (1, 'algorithms and programming');
INSERT INTO public.categories (id_categories, nama) VALUES (2, 'data structures and representations');
INSERT INTO public.categories (id_categories, nama) VALUES (3, 'computer processes and hardware');
INSERT INTO public.categories (id_categories, nama) VALUES (4, 'communication and networking');
INSERT INTO public.categories (id_categories, nama) VALUES (5, 'interactions, systems and society');


--
-- TOC entry 5032 (class 0 OID 57576)
-- Dependencies: 241
-- Data for Name: categories_soal_usulan; Type: TABLE DATA; Schema: public; Owner: -
--

--
-- TOC entry 5026 (class 0 OID 57529)
-- Dependencies: 235
-- Data for Name: gambar_soal_usulan; Type: TABLE DATA; Schema: public; Owner: -
--




--
-- TOC entry 5039 (class 0 OID 65536)
-- Dependencies: 249
-- Data for Name: info_bebras; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.info_bebras (tahap_sekarang, deadline_tahap1, deadline_tahap2, deadline_tahap3, deadline_tahap4, deadline_tahap5, deadline_tahap6, deadline_tahap7) VALUES (0, '2025-02-08 07:00:00+07', '2025-02-12 07:00:00+07', '2025-02-14 07:00:00+07', '2025-02-16 07:00:00+07', '2025-02-18 07:00:00+07', '2025-02-19 07:00:00+07', '2025-02-21 07:00:00+07');


--
-- TOC entry 5041 (class 0 OID 246919)
-- Dependencies: 267
-- Data for Name: non_registered_author; Type: TABLE DATA; Schema: public; Owner: -
--




--
-- TOC entry 5034 (class 0 OID 57593)
-- Dependencies: 243
-- Data for Name: pembuat_soal_usulan; Type: TABLE DATA; Schema: public; Owner: -
--




--
-- TOC entry 5028 (class 0 OID 57543)
-- Dependencies: 237
-- Data for Name: rating_internasional; Type: TABLE DATA; Schema: public; Owner: -
--




--
-- TOC entry 5038 (class 0 OID 57632)
-- Dependencies: 248
-- Data for Name: rating_nasional; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 5036 (class 0 OID 57613)
-- Dependencies: 246
-- Data for Name: review_nasional; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 5024 (class 0 OID 57507)
-- Dependencies: 233
-- Data for Name: soal_usulan; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 5015 (class 0 OID 57352)
-- Dependencies: 222
-- Data for Name: user_bebras; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_bebras (id, username, salt, hashedpassword, nama, role, email, id_biro, ketua) VALUES (7, 'Sam1234', '4ead247d-74ae-485e-acc9-f4069018c987', 'eb85504e72f22044ada48df08a287a1152fedcec5fa695ca74fe1fb90c0ea5f4', 'Sam Washington', 'TIM NASIONAL', 'sam12@gmail.com', 2, false);
INSERT INTO public.user_bebras (id, username, salt, hashedpassword, nama, role, email, id_biro, ketua) VALUES (11, 'aji1234', '04bda6da-aed1-49e7-9a2d-472b9894dd2f', '24bc9c4deb810250f91a41a7819781bf9cb0aa02e68b537337b010b68494d537', 'Aji Purnama', 'BIRO', 'aji@gmail.com', 4, false);
INSERT INTO public.user_bebras (id, username, salt, hashedpassword, nama, role, email, id_biro, ketua) VALUES (8, 'gina1234', '4a4fbc12-2f4a-4be2-b615-13b05e482715', 'd1195082c5dd37e71c638abe66693c680f7a94d3955e6421528c10104de9f64e', 'Gina Tina', 'TIM NASIONAL', 'gina@gmail.com', 3, true);
INSERT INTO public.user_bebras (id, username, salt, hashedpassword, nama, role, email, id_biro, ketua) VALUES (4, 'tom1234', '55dc657f-b9e1-4ba0-b3e3-2ae791ec403e', '2c43a9df704288388bdeea447711a27823d40e7dd3c3a13d81a3dcc5550cedb5', 'Tom Putra', 'TIM NASIONAL', 'tom@gmail.com', 2, false);
INSERT INTO public.user_bebras (id, username, salt, hashedpassword, nama, role, email, id_biro, ketua) VALUES (1, 'budi1234', 'e4b41e59-f71f-492b-a71f-5d40f482bea2', '64e9a689bf1209e703d8dbd26e09a6dd32d359cbb45f21fd424e8e54f152aec4', 'Budi Wijaya', 'BIRO', 'budi@gmail.com', 1, false);
INSERT INTO public.user_bebras (id, username, salt, hashedpassword, nama, role, email, id_biro, ketua) VALUES (2, 'andi1234', '8d989cf6-b2b3-4f09-9837-e3fc0a60960c', '744f34416fe72b072fcdaff5b553ab5f04b32a4246e8540142bda7072e1801af', 'Andi Harto', 'BIRO', 'andi@gmail.com', 1, false);
INSERT INTO public.user_bebras (id, username, salt, hashedpassword, nama, role, email, id_biro, ketua) VALUES (5, 'ben1234', 'eb24c73b-4cd7-4eb9-b0c2-cec13ab8ea32', 'b82d38d87d00fb771bef20098866992a571031a1e6d9dc30485059c1922b7daf', 'Ben Jaya', 'TIM NASIONAL', 'ben@gmail.com', 3, false);
INSERT INTO public.user_bebras (id, username, salt, hashedpassword, nama, role, email, id_biro, ketua) VALUES (3, 'dina1234', '610e3530-a5e8-453d-a86d-a2070eadf475', '4be97ba8baf9f350775c14c03ce913c38a11d5ae179f52c2cd44f609e4151e09', 'Dina Surya', 'BIRO', 'dina@gmail.com', 2, false);
INSERT INTO public.user_bebras (id, username, salt, hashedpassword, nama, role, email, id_biro, ketua) VALUES (6, 'dean1234', 'a397aaad-6370-400b-860e-dcc903e02b41', '408dce14b6c48784e3ebd40436f70c6f5f1d7d11fa30420ba7777b5abed76897', 'Dean Santoso', 'TIM NASIONAL', 'dean@gmail.com', 2, false);
INSERT INTO public.user_bebras (id, username, salt, hashedpassword, nama, role, email, id_biro, ketua) VALUES (9, 'joyce12', '2a27b0ff-b3d8-4768-b36d-403feea408e2', '2868ea5800b6bc97347334c254a868b30eeb4b914a8a655b35d95aa767a78208', 'Joyce Nugroho', 'ADMIN', 'joyce@gmail.com', 3, false);
INSERT INTO public.user_bebras (id, username, salt, hashedpassword, nama, role, email, id_biro, ketua) VALUES (10, 'taylor12', 'b209fe18-8a7f-428c-b304-0ba0a41e1f2f', 'a80a7dc5116ebb8067c3844cbdb25e13cb84d4372524778211c7ef57def68176', 'Taylor Cahya', 'BIRO', 'taylorT@gmail.com', 3, false);


--
-- TOC entry 5016 (class 0 OID 57359)
-- Dependencies: 223
-- Data for Name: user_session; Type: TABLE DATA; Schema: public; Owner: -
--




--
-- TOC entry 5020 (class 0 OID 57395)
-- Dependencies: 227
-- Data for Name: usia; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.usia (id_usia, from_age, to_age) VALUES (1, 6, 8);
INSERT INTO public.usia (id_usia, from_age, to_age) VALUES (2, 8, 10);
INSERT INTO public.usia (id_usia, from_age, to_age) VALUES (3, 10, 12);
INSERT INTO public.usia (id_usia, from_age, to_age) VALUES (4, 12, 14);
INSERT INTO public.usia (id_usia, from_age, to_age) VALUES (5, 14, 16);
INSERT INTO public.usia (id_usia, from_age, to_age) VALUES (6, 16, 19);


--
-- TOC entry 5030 (class 0 OID 57557)
-- Dependencies: 239
-- Data for Name: usia_soal_usulan; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 5061 (class 0 OID 0)
-- Dependencies: 224
-- Name: biro_id_biro_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.biro_id_biro_seq', 4, true);


--
-- TOC entry 5062 (class 0 OID 0)
-- Dependencies: 228
-- Name: categories_id_categories_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_categories_seq', 10, true);


--
-- TOC entry 5063 (class 0 OID 0)
-- Dependencies: 240
-- Name: categories_soal_usulan_id_categories_soal_usulan_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_soal_usulan_id_categories_soal_usulan_seq', 797, true);


--
-- TOC entry 5064 (class 0 OID 0)
-- Dependencies: 234
-- Name: gambar_soal_usulan_id_gambar_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.gambar_soal_usulan_id_gambar_seq', 569, true);


--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 266
-- Name: pembuat_soal_usulan2_id_pembuat_soal_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pembuat_soal_usulan2_id_pembuat_soal_seq', 34, true);


--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 242
-- Name: pembuat_soal_usulan_id_pembuat_soal_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pembuat_soal_usulan_id_pembuat_soal_seq', 395, true);


--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 236
-- Name: rating_internasional_soal_usulan_id_rating_internasional_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rating_internasional_soal_usulan_id_rating_internasional_seq', 37, true);


--
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 247
-- Name: rating_nasional_id_rating_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rating_nasional_id_rating_seq', 103, true);


--
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 245
-- Name: review_nasional_id_review_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.review_nasional_id_review_seq', 72, true);


--
-- TOC entry 5070 (class 0 OID 0)
-- Dependencies: 232
-- Name: soal_usulan_id_soal_usulan_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.soal_usulan_id_soal_usulan_seq', 125, true);


--
-- TOC entry 5071 (class 0 OID 0)
-- Dependencies: 221
-- Name: user_bebras_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_bebras_id_seq', 11, true);


--
-- TOC entry 5072 (class 0 OID 0)
-- Dependencies: 226
-- Name: usia_id_usia_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usia_id_usia_seq', 7, true);


--
-- TOC entry 5073 (class 0 OID 0)
-- Dependencies: 238
-- Name: usia_soal_usulan_id_usia_soal_usulan_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usia_soal_usulan_id_usia_soal_usulan_seq', 461, true);


--
-- TOC entry 4824 (class 2606 OID 57382)
-- Name: biro biro_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.biro
    ADD CONSTRAINT biro_pkey PRIMARY KEY (id_biro);


--
-- TOC entry 4828 (class 2606 OID 57407)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id_categories);


--
-- TOC entry 4842 (class 2606 OID 57581)
-- Name: categories_soal_usulan categories_soal_usulan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories_soal_usulan
    ADD CONSTRAINT categories_soal_usulan_pkey PRIMARY KEY (id_categories_soal_usulan);


--
-- TOC entry 4832 (class 2606 OID 57536)
-- Name: gambar_soal_usulan gambar_soal_usulan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gambar_soal_usulan
    ADD CONSTRAINT gambar_soal_usulan_pkey PRIMARY KEY (id_gambar);


--
-- TOC entry 4852 (class 2606 OID 246925)
-- Name: non_registered_author pembuat_soal_usulan2_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.non_registered_author
    ADD CONSTRAINT pembuat_soal_usulan2_pkey PRIMARY KEY (id_pembuat_soal);


--
-- TOC entry 4846 (class 2606 OID 57598)
-- Name: pembuat_soal_usulan pembuat_soal_usulan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pembuat_soal_usulan
    ADD CONSTRAINT pembuat_soal_usulan_pkey PRIMARY KEY (id_pembuat_soal);


--
-- TOC entry 4836 (class 2606 OID 57550)
-- Name: rating_internasional rating_internasional_soal_usulan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rating_internasional
    ADD CONSTRAINT rating_internasional_soal_usulan_pkey PRIMARY KEY (id_rating_internasional);


--
-- TOC entry 4850 (class 2606 OID 57637)
-- Name: rating_nasional rating_nasional_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rating_nasional
    ADD CONSTRAINT rating_nasional_pkey PRIMARY KEY (id_rating);


--
-- TOC entry 4848 (class 2606 OID 57620)
-- Name: review_nasional review_nasional_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review_nasional
    ADD CONSTRAINT review_nasional_pkey PRIMARY KEY (id_review);


--
-- TOC entry 4830 (class 2606 OID 57516)
-- Name: soal_usulan soal_usulan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.soal_usulan
    ADD CONSTRAINT soal_usulan_pkey PRIMARY KEY (id_soal_usulan);


--
-- TOC entry 4844 (class 2606 OID 90209)
-- Name: categories_soal_usulan unique_categories_usulan; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories_soal_usulan
    ADD CONSTRAINT unique_categories_usulan UNIQUE (id_soal_usulan, id_categories);


--
-- TOC entry 4834 (class 2606 OID 90205)
-- Name: gambar_soal_usulan unique_gambar_usulan; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gambar_soal_usulan
    ADD CONSTRAINT unique_gambar_usulan UNIQUE (id_soal_usulan, path);


--
-- TOC entry 4818 (class 2606 OID 90136)
-- Name: user_bebras unique_username; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_bebras
    ADD CONSTRAINT unique_username UNIQUE (username);


--
-- TOC entry 4838 (class 2606 OID 90207)
-- Name: usia_soal_usulan unique_usia_usulan; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usia_soal_usulan
    ADD CONSTRAINT unique_usia_usulan UNIQUE (id_soal_usulan, id_usia);


--
-- TOC entry 4820 (class 2606 OID 57358)
-- Name: user_bebras user_bebras_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_bebras
    ADD CONSTRAINT user_bebras_pkey PRIMARY KEY (id);


--
-- TOC entry 4822 (class 2606 OID 57365)
-- Name: user_session user_session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_session
    ADD CONSTRAINT user_session_pkey PRIMARY KEY (id);


--
-- TOC entry 4826 (class 2606 OID 57400)
-- Name: usia usia_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usia
    ADD CONSTRAINT usia_pkey PRIMARY KEY (id_usia);


--
-- TOC entry 4840 (class 2606 OID 57564)
-- Name: usia_soal_usulan usia_soal_usulan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usia_soal_usulan
    ADD CONSTRAINT usia_soal_usulan_pkey PRIMARY KEY (id_usia_soal_usulan);


--
-- TOC entry 4861 (class 2606 OID 57587)
-- Name: categories_soal_usulan categories_soal_usulan_id_categories_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories_soal_usulan
    ADD CONSTRAINT categories_soal_usulan_id_categories_fkey FOREIGN KEY (id_categories) REFERENCES public.categories(id_categories);


--
-- TOC entry 4862 (class 2606 OID 57582)
-- Name: categories_soal_usulan categories_soal_usulan_id_soal_usulan_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories_soal_usulan
    ADD CONSTRAINT categories_soal_usulan_id_soal_usulan_fkey FOREIGN KEY (id_soal_usulan) REFERENCES public.soal_usulan(id_soal_usulan);


--
-- TOC entry 4853 (class 2606 OID 57383)
-- Name: user_bebras fk_id_biro; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_bebras
    ADD CONSTRAINT fk_id_biro FOREIGN KEY (id_biro) REFERENCES public.biro(id_biro);


--
-- TOC entry 4857 (class 2606 OID 57537)
-- Name: gambar_soal_usulan gambar_soal_usulan_id_soal_usulan_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gambar_soal_usulan
    ADD CONSTRAINT gambar_soal_usulan_id_soal_usulan_fkey FOREIGN KEY (id_soal_usulan) REFERENCES public.soal_usulan(id_soal_usulan);


--
-- TOC entry 4869 (class 2606 OID 246937)
-- Name: non_registered_author non_registered_user_id_biro_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.non_registered_author
    ADD CONSTRAINT non_registered_user_id_biro_fkey FOREIGN KEY (id_biro) REFERENCES public.biro(id_biro);


--
-- TOC entry 4870 (class 2606 OID 246931)
-- Name: non_registered_author pembuat_soal_usulan2_id_soal_usulan_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.non_registered_author
    ADD CONSTRAINT pembuat_soal_usulan2_id_soal_usulan_fkey FOREIGN KEY (id_soal_usulan) REFERENCES public.soal_usulan(id_soal_usulan);


--
-- TOC entry 4863 (class 2606 OID 57604)
-- Name: pembuat_soal_usulan pembuat_soal_usulan_id_soal_usulan_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pembuat_soal_usulan
    ADD CONSTRAINT pembuat_soal_usulan_id_soal_usulan_fkey FOREIGN KEY (id_soal_usulan) REFERENCES public.soal_usulan(id_soal_usulan);


--
-- TOC entry 4864 (class 2606 OID 57599)
-- Name: pembuat_soal_usulan pembuat_soal_usulan_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pembuat_soal_usulan
    ADD CONSTRAINT pembuat_soal_usulan_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.user_bebras(id);


--
-- TOC entry 4858 (class 2606 OID 57551)
-- Name: rating_internasional rating_internasional_soal_usulan_id_soal_usulan_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rating_internasional
    ADD CONSTRAINT rating_internasional_soal_usulan_id_soal_usulan_fkey FOREIGN KEY (id_soal_usulan) REFERENCES public.soal_usulan(id_soal_usulan);


--
-- TOC entry 4867 (class 2606 OID 57643)
-- Name: rating_nasional rating_nasional_id_soal_usulan_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rating_nasional
    ADD CONSTRAINT rating_nasional_id_soal_usulan_fkey FOREIGN KEY (id_soal_usulan) REFERENCES public.soal_usulan(id_soal_usulan);


--
-- TOC entry 4868 (class 2606 OID 57638)
-- Name: rating_nasional rating_nasional_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rating_nasional
    ADD CONSTRAINT rating_nasional_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.user_bebras(id);


--
-- TOC entry 4865 (class 2606 OID 57626)
-- Name: review_nasional review_nasional_id_soal_usulan_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review_nasional
    ADD CONSTRAINT review_nasional_id_soal_usulan_fkey FOREIGN KEY (id_soal_usulan) REFERENCES public.soal_usulan(id_soal_usulan);


--
-- TOC entry 4866 (class 2606 OID 57621)
-- Name: review_nasional review_nasional_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review_nasional
    ADD CONSTRAINT review_nasional_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.user_bebras(id);


--
-- TOC entry 4855 (class 2606 OID 57517)
-- Name: soal_usulan soal_usulan_uploader_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.soal_usulan
    ADD CONSTRAINT soal_usulan_uploader_fkey FOREIGN KEY (uploader) REFERENCES public.user_bebras(id);


--
-- TOC entry 4856 (class 2606 OID 57522)
-- Name: soal_usulan soal_usulan_who_last_updated_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.soal_usulan
    ADD CONSTRAINT soal_usulan_who_last_updated_fkey FOREIGN KEY (who_last_updated) REFERENCES public.user_bebras(id);


--
-- TOC entry 4854 (class 2606 OID 57366)
-- Name: user_session user_session_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_session
    ADD CONSTRAINT user_session_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_bebras(id);


--
-- TOC entry 4859 (class 2606 OID 57565)
-- Name: usia_soal_usulan usia_soal_usulan_id_soal_usulan_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usia_soal_usulan
    ADD CONSTRAINT usia_soal_usulan_id_soal_usulan_fkey FOREIGN KEY (id_soal_usulan) REFERENCES public.soal_usulan(id_soal_usulan);


--
-- TOC entry 4860 (class 2606 OID 57570)
-- Name: usia_soal_usulan usia_soal_usulan_id_usia_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usia_soal_usulan
    ADD CONSTRAINT usia_soal_usulan_id_usia_fkey FOREIGN KEY (id_usia) REFERENCES public.usia(id_usia);


-- Completed on 2025-02-06 23:24:29

--
-- PostgreSQL database dump complete
--

