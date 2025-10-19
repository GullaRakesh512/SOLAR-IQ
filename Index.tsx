import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Sun, Zap, TrendingUp, Leaf, Loader2 } from "lucide-react";

const GEMINI_API_KEY = "";

interface SolarResults {
  powerOutput: number;
  dailyEnergy: number;
  monthlyEnergy: number;
  savings: number;
  co2Savings: number;
}

const Index = () => {
  const { toast } = useToast();
  const [area, setArea] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [irradiance, setIrradiance] = useState("");
  const [hours, setHours] = useState("");
  const [tariff, setTariff] = useState("");
  const [results, setResults] = useState<SolarResults | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const calculatePerformance = async () => {
    if (!area || !efficiency || !irradiance || !hours || !tariff) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to calculate performance.",
        variant: "destructive",
      });
      return;
    }

    const areaNum = parseFloat(area);
    const efficiencyNum = parseFloat(efficiency);
    const irradianceNum = parseFloat(irradiance);
    const hoursNum = parseFloat(hours);
    const tariffNum = parseFloat(tariff);

    const powerOutput = areaNum * irradianceNum * (efficiencyNum / 100);
    const dailyEnergy = (powerOutput * hoursNum * 0.85) / 1000;
    const monthlyEnergy = dailyEnergy * 30;
    const savings = monthlyEnergy * tariffNum;
    const co2Savings = monthlyEnergy * 0.85;

    const calculatedResults = {
      powerOutput,
      dailyEnergy,
      monthlyEnergy,
      savings,
      co2Savings,
    };

    setResults(calculatedResults);
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Based on this solar performance data, analyze the system efficiency and suggest 2-3 practical ways to improve performance:
- Panel Area: ${areaNum} m²
- Panel Efficiency: ${efficiencyNum}%
- Solar Irradiance: ${irradianceNum} W/m²
- Average Sunlight Hours: ${hoursNum} hours/day
- Power Output: ${powerOutput.toFixed(2)} W
- Daily Energy: ${dailyEnergy.toFixed(2)} kWh
- Monthly Energy: ${monthlyEnergy.toFixed(2)} kWh
- Monthly Savings: ₹${savings.toFixed(2)}
- CO₂ Savings: ${co2Savings.toFixed(2)} kg/month

Please provide concise, actionable recommendations such as tilt angle adjustment, panel cleaning frequency, or inverter efficiency improvements.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const suggestions = data.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to generate suggestions at this time.";
      setAiSuggestions(suggestions);
    } catch (error) {
      toast({
        title: "AI Analysis Error",
        description: "Could not generate AI suggestions. Please try again.",
        variant: "destructive",
      });
      setAiSuggestions("Unable to connect to AI service.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-secondary/10 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <Sun className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SolarIQ
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Smart Solar Performance Analyzer
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                System Parameters
              </CardTitle>
              <CardDescription>
                Enter your solar panel specifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="area">Panel Area (m²)</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="e.g., 10"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="efficiency">Panel Efficiency (%)</Label>
                <Input
                  id="efficiency"
                  type="number"
                  placeholder="e.g., 18"
                  value={efficiency}
                  onChange={(e) => setEfficiency(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="irradiance">Solar Irradiance (W/m²)</Label>
                <Input
                  id="irradiance"
                  type="number"
                  placeholder="e.g., 1000"
                  value={irradiance}
                  onChange={(e) => setIrradiance(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hours">Average Sunlight Hours per Day</Label>
                <Input
                  id="hours"
                  type="number"
                  placeholder="e.g., 5"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tariff">Electricity Tariff (₹/kWh)</Label>
                <Input
                  id="tariff"
                  type="number"
                  placeholder="e.g., 8"
                  value={tariff}
                  onChange={(e) => setTariff(e.target.value)}
                />
              </div>

              <Button
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                onClick={calculatePerformance}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Estimate Performance"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Card */}
          <div className="space-y-6">
            {results && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-success" />
                    Performance Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-accent p-4">
                    <p className="text-sm text-muted-foreground">Instantaneous Power Output</p>
                    <p className="text-2xl font-bold text-primary">{results.powerOutput.toFixed(2)} W</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-secondary/10 p-3">
                      <p className="text-xs text-muted-foreground">Daily Energy</p>
                      <p className="text-lg font-semibold text-secondary">{results.dailyEnergy.toFixed(2)} kWh</p>
                    </div>
                    <div className="rounded-lg bg-secondary/10 p-3">
                      <p className="text-xs text-muted-foreground">Monthly Energy</p>
                      <p className="text-lg font-semibold text-secondary">{results.monthlyEnergy.toFixed(2)} kWh</p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-success/10 p-4">
                    <p className="text-sm text-muted-foreground">Monthly Cost Savings</p>
                    <p className="text-2xl font-bold text-success">₹{results.savings.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg bg-emerald-50 p-4">
                    <Leaf className="h-6 w-6 text-emerald-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">CO₂ Emission Savings</p>
                      <p className="text-xl font-bold text-emerald-600">{results.co2Savings.toFixed(2)} kg/month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {aiSuggestions && (
              <Card className="shadow-lg border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Sun className="h-5 w-5" />
                    AI Performance Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                    {aiSuggestions}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
