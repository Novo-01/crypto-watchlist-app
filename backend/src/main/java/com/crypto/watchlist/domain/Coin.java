package com.crypto.watchlist.domain;

public class Coin {
    private String id;
    private String name;
    private String symbol;
    private double currentPrice;

    public Coin(String id, String name, String symbol, double currentPrice) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;
        this.currentPrice = currentPrice;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSymbol() {
        return symbol;
    }

    public double getCurrentPrice() {
        return currentPrice;
    }
}
