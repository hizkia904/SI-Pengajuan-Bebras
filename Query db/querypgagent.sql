-- ubah ke tahap 2

INSERT INTO pgagent.pga_job(jobid,jobname,jobenabled,jobjclid) 
VALUES (1,'TO_PHASE2', true,1);

INSERT INTO pgagent.pga_jobstep(jstjobid, jstname, jstenabled, jstkind, jstcode,jstdbname,jstonerror)
VALUES (1, 'STEP_TO_PHASE2', true, 's', $$update info_bebras set tahap_sekarang=2;update soal_usulan set status_nasional='IN REVIEW' where archived=false;$$,'bebras','f');

INSERT INTO pgagent.pga_schedule (jscjobid, jscname, jscenabled, jscstart,jscend)
VALUES (1,'SCHEDULE_PHASE2',true,'2024-09-20 08:02:00','2024-09-20 08:05:30');


-- ubah ke tahap 3

INSERT INTO pgagent.pga_job(jobid,jobname,jobenabled,jobjclid) 
VALUES (2,'TO_PHASE3', true,1);

INSERT INTO pgagent.pga_jobstep(jstjobid, jstname, jstenabled, jstkind, jstcode,jstdbname,jstonerror)
VALUES (2, 'STEP_TO_PHASE3', true, 's', $$update info_bebras set tahap_sekarang=3;update soal_usulan set status_nasional='IN REVISE' where archived=false;$$,'bebras','f');

INSERT INTO pgagent.pga_schedule (jscjobid, jscname, jscenabled, jscstart,jscend)
VALUES (2,'SCHEDULE_PHASE3',true,'2024-09-20 08:07:00','2024-09-20 08:09:30');

-- ubah ke tahap 4

INSERT INTO pgagent.pga_job(jobid,jobname,jobenabled,jobjclid) 
VALUES (3,'TO_PHASE4', true,1);

INSERT INTO pgagent.pga_jobstep(jstjobid, jstname, jstenabled, jstkind, jstcode,jstdbname,jstonerror)
VALUES (3, 'STEP_TO_PHASE4', true, 's', $$update info_bebras set tahap_sekarang=4;update soal_usulan set status_nasional='FILTERING' where archived=false;$$,'bebras','f');

INSERT INTO pgagent.pga_schedule (jscjobid, jscname, jscenabled, jscstart,jscend)
VALUES (3,'SCHEDULE_PHASE4',true,'2024-09-20 08:11:00','2024-09-20 08:15:00');

-- ubah ke tahap 5

INSERT INTO pgagent.pga_job(jobid,jobname,jobenabled,jobjclid) 
VALUES (4,'TO_PHASE5', true,1);

INSERT INTO pgagent.pga_jobstep(jstjobid, jstname, jstenabled, jstkind, jstcode,jstdbname,jstonerror)
VALUES (4, 'STEP_TO_PHASE5', true, 's', $$update info_bebras set tahap_sekarang=5;update soal_usulan set status_nasional='REJECTED',gotointernational=false where status_nasional='FILTERING' and archived=false;update soal_usulan set status_internasional='IN REVIEW' where archived=false and gotointernational=true;$$,'bebras','f');

INSERT INTO pgagent.pga_schedule (jscjobid, jscname, jscenabled, jscstart,jscend)
VALUES (4,'SCHEDULE_PHASE5',true,'2024-09-20 08:18:00','2024-09-20 08:21:00');

-- ubah ke tahap 6

INSERT INTO pgagent.pga_job(jobid,jobname,jobenabled,jobjclid) 
VALUES (5,'TO_PHASE6', true,1);

INSERT INTO pgagent.pga_jobstep(jstjobid, jstname, jstenabled, jstkind, jstcode,jstdbname,jstonerror)
VALUES (5, 'STEP_TO_PHASE6', true, 's', $$update info_bebras set tahap_sekarang=6;update soal_usulan set status_internasional='IN REVISE' where archived=false and gotointernational=true;$$,'bebras','f');

INSERT INTO pgagent.pga_schedule (jscjobid, jscname, jscenabled, jscstart,jscend)
VALUES (5,'SCHEDULE_PHASE6',true,'2024-09-20 08:25:00','2024-09-20 08:30:00');


-- ubah ke tahap 7

INSERT INTO pgagent.pga_job(jobid,jobname,jobenabled,jobjclid) 
VALUES (6,'TO_PHASE7', true,1);

INSERT INTO pgagent.pga_jobstep(jstjobid, jstname, jstenabled, jstkind, jstcode,jstdbname,jstonerror)
VALUES (6, 'STEP_TO_PHASE7', true, 's', $$update info_bebras set tahap_sekarang=7;update soal_usulan set status_internasional='WAITING FOR RESULT' where archived=false  and gotointernational=true;$$,'bebras','f');

INSERT INTO pgagent.pga_schedule (jscjobid, jscname, jscenabled, jscstart,jscend)
VALUES (6,'SCHEDULE_PHASE7',true,'2024-09-20 08:32:00','2024-09-20 08:35:00');

-- ubah ke tahap 8

INSERT INTO pgagent.pga_job(jobid,jobname,jobenabled,jobjclid) 
VALUES (7,'TO_PHASE0', true,1);

INSERT INTO pgagent.pga_jobstep(jstjobid, jstname, jstenabled, jstkind, jstcode,jstdbname,jstonerror)
VALUES (7, 'STEP_TO_PHASE0', true, 's', $$update info_bebras set tahap_sekarang=0;update soal_usulan set status_nasional='ACCEPTED' where status_nasional='ADDED FROM ARCHIVE';update soal_usulan set archived=true where archived=false;$$,'bebras','f');

INSERT INTO pgagent.pga_schedule (jscjobid, jscname, jscenabled, jscstart,jscend)
VALUES (7,'SCHEDULE_PHASE0',true,'2024-09-20 08:37:00','2024-09-20 08:40:00');