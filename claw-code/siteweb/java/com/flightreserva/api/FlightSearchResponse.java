package com.flightreserva.api;

import java.util.List;

/**
 * Response model for flight search.
 */
public class FlightSearchResponse {
    private boolean success;
    private List<Flight> data;
    private String error;

    public FlightSearchResponse() {}
    public FlightSearchResponse(boolean success, List<Flight> data) {
        this.success = success;
        this.data = data;
    }
    public FlightSearchResponse(boolean success, String error) {
        this.success = success;
        this.error = error;
    }
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
    public List<Flight> getData() { return data; }
    public void setData(List<Flight> data) { this.data = data; }
    public String getError() { return error; }
    public void setError(String error) { this.error = error; }
}