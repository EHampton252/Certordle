var builder = WebApplication.CreateBuilder(args);

// Add service defaults & Aspire client integrations.
builder.AddServiceDefaults();

// Add services to the container.
builder.Services.AddProblemDetails();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

var api = app.MapGroup("/api");
api.MapGet("daily-challenge", () => Results.Ok(new DailyChallenge(
    DateOnly.FromDateTime(DateTime.UtcNow),
    "AWS service used to decouple microservices with durable message queues.",
    "AWS",
    "Associate",
    3,
    ["It supports visibility timeouts.", "It can trigger Lambda.", "It is not a pub/sub topic."]
)))
.WithName("GetDailyChallenge");

app.MapDefaultEndpoints();

app.UseFileServer();

app.Run();

record DailyChallenge(
    DateOnly Date,
    string Prompt,
    string CertificationTrack,
    string Difficulty,
    int MaxGuesses,
    string[] Hints);
