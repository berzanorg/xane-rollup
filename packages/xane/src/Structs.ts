import { Bool, Field, PublicKey, Struct, UInt64 } from "o1js"

/**
 * A proovable type that represents a user's balance for a specific token.
 */
export class Balance extends Struct({
    tokenId: Field,
    address: PublicKey,
    amount: UInt64,
}) {
    /**
     * Creates an empty `Balance` with all the properties initialized to empty values.
     */
    public static empty(): Balance {
        return new Balance({
            tokenId: Field.empty(),
            address: PublicKey.empty(),
            amount: UInt64.empty(),
        })
    }

    /**
     * Returns true if the `Balance` equals `Balance.emtpy()`, if not returns false.
     */
    public isEmpty(): Bool {
        return Bool(true)
            .and(this.tokenId.equals(Field.empty()))
            .and(this.address.equals(PublicKey.empty()))
            .and(this.amount.equals(UInt64.empty()))
    }

    /**
     * Returns the `Array<Field>` representation of the `Balance`.
     */
    public toFields(): Array<Field> {
        return [
            ...this.tokenId.toFields(),
            ...this.address.toFields(),
            ...this.amount.toFields(),
        ]
    }

    /**
     *  Returns `true`, if given token ID and address matches the `Balance`'s.
     *
     *  Otherwise, returns `false`.
     */
    public matches(other: { tokenId: Field; address: PublicKey }): boolean {
        return Bool(true)
            .and(this.tokenId.equals(other.tokenId))
            .and(this.address.equals(other.address))
            .toBoolean()
    }
}

/**
 * A proovable type that represents a user's liquidity in a pool.
 */
export class Liquidity extends Struct({
    baseTokenId: Field,
    quoteTokenId: Field,
    lpTokenAmount: UInt64,
    provider: PublicKey,
}) {
    /**
     * Creates an empty `Liquidity` with all the properties initialized to empty values.
     */
    public static empty(): Liquidity {
        return new Liquidity({
            baseTokenId: Field.empty(),
            quoteTokenId: Field.empty(),
            lpTokenAmount: UInt64.empty(),
            provider: PublicKey.empty(),
        })
    }

    /**
     * Returns the `Array<Field>` representation of the `Liquidity`.
     */
    public toFields(): Array<Field> {
        return [
            ...this.baseTokenId.toFields(),
            ...this.quoteTokenId.toFields(),
            ...this.lpTokenAmount.toFields(),
            ...this.provider.toFields(),
        ]
    }

    /**
     * Returns true if the `Liquidity` equals `Liquidity.emtpy()`, if not returns false.
     */
    public isEmpty(): Bool {
        return Bool(true)
            .and(this.baseTokenId.equals(Field.empty()))
            .and(this.quoteTokenId.equals(Field.empty()))
            .and(this.lpTokenAmount.equals(UInt64.empty()))
            .and(this.provider.equals(PublicKey.empty()))
    }

    /**
     *  Returns `true`, if given base token ID, quote token ID, and provider matches the `Liquidity`'s.
     *
     *  Otherwise, returns `false`.
     */
    public matches(params: {
        baseTokenId: Field
        quoteTokenId: Field
        provider: PublicKey
    }): boolean {
        return Bool(true)
            .and(this.baseTokenId.equals(params.baseTokenId))
            .and(this.quoteTokenId.equals(params.quoteTokenId))
            .and(this.provider.equals(params.provider))
            .toBoolean()
    }

    /**
     *  Returns `true`, if given base token ID, quote token ID, and provider matches the `Liquidity`'s.
     *
     *  Otherwise, returns `false`.
     *
     * NOTE: Even if base token ID and quote token ID is in the wrong order, it still returns `true`, because it means similar.
     */
    public isSimilar(params: {
        baseTokenId: Field
        quoteTokenId: Field
        provider: PublicKey
    }): boolean {
        return Bool(true)
            .and(this.provider.equals(params.provider))
            .and(
                Bool(false)
                    .or(
                        Bool(true)
                            .and(this.baseTokenId.equals(params.baseTokenId))
                            .and(this.quoteTokenId.equals(params.quoteTokenId)),
                    )
                    .or(
                        Bool(true)
                            .and(this.baseTokenId.equals(params.quoteTokenId))
                            .and(this.quoteTokenId.equals(params.baseTokenId)),
                    ),
            )
            .toBoolean()
    }
}

/**
 * A proovable type that represents an AMM pool for a specific pair.
 */
export class Pool extends Struct({
    baseTokenId: Field,
    quoteTokenId: Field,
    baseTokenAmount: UInt64,
    quoteTokenAmount: UInt64,
    k: UInt64,
    lpTokensSupply: UInt64,
}) {
    /**
     * Creates an empty `Pool` with all the properties initialized to empty values.
     */
    public static empty(): Pool {
        return new Pool({
            baseTokenId: Field.empty(),
            quoteTokenId: Field.empty(),
            baseTokenAmount: UInt64.empty(),
            quoteTokenAmount: UInt64.empty(),
            k: UInt64.empty(),
            lpTokensSupply: UInt64.empty(),
        })
    }

    /**
     * Returns the `Array<Field>` representation of the `Pool`.
     */
    public toFields(): Array<Field> {
        return [
            ...this.baseTokenId.toFields(),
            ...this.quoteTokenId.toFields(),
            ...this.baseTokenAmount.toFields(),
            ...this.quoteTokenAmount.toFields(),
            ...this.k.toFields(),
            ...this.lpTokensSupply.toFields(),
        ]
    }

    /**
     * Returns true if the `Pool` equals `Pool.emtpy()`, if not returns false.
     */
    public isEmpty(): Bool {
        return Bool(true)
            .and(this.baseTokenId.equals(Field.empty()))
            .and(this.quoteTokenId.equals(Field.empty()))
            .and(this.baseTokenAmount.equals(UInt64.empty()))
            .and(this.quoteTokenAmount.equals(UInt64.empty()))
            .and(this.k.equals(UInt64.empty()))
            .and(this.lpTokensSupply.equals(UInt64.empty()))
    }

    /**
     *  Returns `true`, if given base token ID, and quote token ID matches the `Pool`'s.
     *
     *  Otherwise, returns `false`.
     */
    public matches(other: { baseTokenId: Field; quoteTokenId: Field }): boolean {
        return Bool(false)
            .or(
                Bool(true)
                    .and(this.baseTokenId.equals(other.baseTokenId))
                    .and(this.quoteTokenId.equals(other.quoteTokenId)),
            )
            .or(
                Bool(true)
                    .and(this.baseTokenId.equals(other.quoteTokenId))
                    .and(this.quoteTokenId.equals(other.baseTokenId)),
            )
            .toBoolean()
    }

    /**
     *  Returns `true`, if given base token ID, and quote token ID matches the `Pool`'s.
     *
     *  Otherwise, returns `false`.
     *
     * NOTE: Even if base token ID and quote token ID is in the wrong order, it still returns `true`, because it means similar.
     */
    public isSimilar(other: { baseTokenId: Field; quoteTokenId: Field }): boolean {
        return Bool(false)
            .or(
                Bool(true)
                    .and(this.baseTokenId.equals(other.baseTokenId))
                    .and(this.quoteTokenId.equals(other.quoteTokenId)),
            )
            .or(
                Bool(true)
                    .and(this.baseTokenId.equals(other.quoteTokenId))
                    .and(this.quoteTokenId.equals(other.baseTokenId)),
            )
            .toBoolean()
    }
}
