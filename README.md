# Certordle
Certordle is a daily certification study game where users receive a short prompt or scenario and must guess the correct certification-related concept, service, resource, tool, or architectural pattern.

## Project structure

- `Certordle.AppHost/` - .NET Aspire AppHost for local orchestration.
- `Certordle.Server/` - ASP.NET Core Minimal API backend targeting .NET 10.
- `frontend/` - React and TypeScript Vite frontend.
- `docs/specs/Certordle Technical Spec.pdf` - Stored product/technical spec for future reference.

## Run locally

```powershell
dotnet restore Certordle.sln
dotnet run --project Certordle.AppHost
```

The Aspire dashboard will show the backend service and Vite frontend once the AppHost starts.
