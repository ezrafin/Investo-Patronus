CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "plpgsql" WITH SCHEMA "pg_catalog";
CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";
--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



SET default_table_access_method = heap;

--
-- Name: forum_discussions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.forum_discussions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    author_name text DEFAULT 'Anonymous'::text NOT NULL,
    category text DEFAULT 'general'::text NOT NULL,
    reply_count integer DEFAULT 0 NOT NULL,
    view_count integer DEFAULT 0 NOT NULL,
    is_pinned boolean DEFAULT false NOT NULL,
    is_featured boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: forum_replies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.forum_replies (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    discussion_id uuid NOT NULL,
    content text NOT NULL,
    author_name text DEFAULT 'Anonymous'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: forum_topic_requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.forum_topic_requests (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    requester_name text NOT NULL,
    requester_email text NOT NULL,
    topic_title text NOT NULL,
    topic_description text NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    admin_notes text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    reviewed_at timestamp with time zone,
    CONSTRAINT forum_topic_requests_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'approved'::text, 'rejected'::text])))
);


--
-- Name: news_articles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.news_articles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    external_id text NOT NULL,
    title text NOT NULL,
    excerpt text,
    content text,
    url text,
    image_url text,
    source_name text NOT NULL,
    source_id text,
    author text,
    published_at timestamp with time zone NOT NULL,
    market text DEFAULT 'general'::text NOT NULL,
    fetched_at timestamp with time zone DEFAULT now() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: news_fetch_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.news_fetch_log (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    market text NOT NULL,
    last_fetched_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: forum_discussions forum_discussions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forum_discussions
    ADD CONSTRAINT forum_discussions_pkey PRIMARY KEY (id);


--
-- Name: forum_replies forum_replies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forum_replies
    ADD CONSTRAINT forum_replies_pkey PRIMARY KEY (id);


--
-- Name: forum_topic_requests forum_topic_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forum_topic_requests
    ADD CONSTRAINT forum_topic_requests_pkey PRIMARY KEY (id);


--
-- Name: news_articles news_articles_external_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news_articles
    ADD CONSTRAINT news_articles_external_id_key UNIQUE (external_id);


--
-- Name: news_articles news_articles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news_articles
    ADD CONSTRAINT news_articles_pkey PRIMARY KEY (id);


--
-- Name: news_fetch_log news_fetch_log_market_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news_fetch_log
    ADD CONSTRAINT news_fetch_log_market_key UNIQUE (market);


--
-- Name: news_fetch_log news_fetch_log_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news_fetch_log
    ADD CONSTRAINT news_fetch_log_pkey PRIMARY KEY (id);


--
-- Name: idx_news_articles_fetched_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_news_articles_fetched_at ON public.news_articles USING btree (fetched_at DESC);


--
-- Name: idx_news_articles_market; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_news_articles_market ON public.news_articles USING btree (market);


--
-- Name: idx_news_articles_published_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_news_articles_published_at ON public.news_articles USING btree (published_at DESC);


--
-- Name: forum_replies forum_replies_discussion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forum_replies
    ADD CONSTRAINT forum_replies_discussion_id_fkey FOREIGN KEY (discussion_id) REFERENCES public.forum_discussions(id) ON DELETE CASCADE;


--
-- Name: forum_topic_requests Anyone can submit topic requests; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can submit topic requests" ON public.forum_topic_requests FOR INSERT WITH CHECK (true);


--
-- Name: forum_topic_requests Approved requests are publicly readable; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Approved requests are publicly readable" ON public.forum_topic_requests FOR SELECT USING ((status = 'approved'::text));


--
-- Name: news_fetch_log Fetch log is publicly readable; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Fetch log is publicly readable" ON public.news_fetch_log FOR SELECT USING (true);


--
-- Name: forum_discussions Forum discussions are publicly readable; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Forum discussions are publicly readable" ON public.forum_discussions FOR SELECT USING (true);


--
-- Name: forum_replies Forum replies are publicly readable; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Forum replies are publicly readable" ON public.forum_replies FOR SELECT USING (true);


--
-- Name: news_articles News articles are publicly readable; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "News articles are publicly readable" ON public.news_articles FOR SELECT USING (true);


--
-- Name: forum_discussions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.forum_discussions ENABLE ROW LEVEL SECURITY;

--
-- Name: forum_replies; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;

--
-- Name: forum_topic_requests; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.forum_topic_requests ENABLE ROW LEVEL SECURITY;

--
-- Name: news_articles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

--
-- Name: news_fetch_log; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.news_fetch_log ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


