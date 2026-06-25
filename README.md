# Certordle
Certordle is a daily certification study game where users receive a short prompt or scenario and must guess the correct certification-related concept, service, resource, tool, or architectural pattern.

## Project structure

- `src/Certordle.AppHost/` - .NET Aspire AppHost for local orchestration.
- `src/Certordle.Api/` - ASP.NET Core Minimal API backend targeting .NET 10.
- `src/Certordle.Web/` - React and TypeScript Vite frontend.
- `docs/ADRs/` - Architecture decision records.
- `docs/specs/Certordle Technical Spec.pdf` - Stored product/technical spec for future reference.

## Run locally

```powershell
dotnet restore Certordle.sln
dotnet run --project src/Certordle.AppHost
```

The Aspire dashboard will show the backend service and Vite frontend once the AppHost starts.
