@echo off
title Levantar Sistema Talento Humano - Docker
echo =======================================================
echo   Levantando Sistema de Talento Humano (FAME S.A.C.)
echo   PostgreSQL + Backend API + Frontend Web
echo =======================================================
echo.
docker-compose up --build -d
echo.
echo =======================================================
echo  Estado de los contenedores:
docker-compose ps
echo =======================================================
echo.
echo Acceso a la aplicacion:
echo - Frontend Web:  http://localhost:3000
echo - Backend API:   http://localhost:4000/api/reports
echo.
pause

