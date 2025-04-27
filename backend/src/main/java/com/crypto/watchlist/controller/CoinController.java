package com.crypto.watchlist.controller;

import com.crypto.watchlist.domain.Coin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/coins")
@CrossOrigin(origins = "http://localhost:3000")
public class CoinController {

    @GetMapping
    public List<Coin> getCoins() {
        List<Coin> coins = new ArrayList<>();
        coins.add(new Coin("bitcoin", "Bitcoin", "BTC", 65000));
        coins.add(new Coin("ethereum", "Ethereum", "ETH", 3200));
        coins.add(new Coin("dogecoin", "Dogecoin", "DOGE", 0.12));
        return coins;
    }
}
