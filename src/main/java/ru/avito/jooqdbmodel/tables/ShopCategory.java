/**
 * This class is generated by jOOQ
 */
package ru.avito.jooqdbmodel.tables;


import org.jooq.*;
import org.jooq.impl.TableImpl;
import ru.avito.jooqdbmodel.Avito;
import ru.avito.jooqdbmodel.Keys;
import ru.avito.jooqdbmodel.tables.records.ShopCategoryRecord;

import javax.annotation.Generated;
import java.util.Arrays;
import java.util.List;


/**
 * This class is generated by jOOQ.
 */
@Generated(
        value = {
                "http://www.jooq.org",
                "jOOQ version:3.8.0"
        },
        comments = "This class is generated by jOOQ"
)
@SuppressWarnings({"all", "unchecked", "rawtypes"})
public class ShopCategory extends TableImpl<ShopCategoryRecord> {

    private static final long serialVersionUID = 1661174338;

    /**
     * The reference instance of <code>avito.shop_category</code>
     */
    public static final ShopCategory SHOP_CATEGORY = new ShopCategory();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<ShopCategoryRecord> getRecordType() {
        return ShopCategoryRecord.class;
    }

    /**
     * The column <code>avito.shop_category.id</code>.
     */
    public final TableField<ShopCategoryRecord, Integer> ID = createField("id", org.jooq.impl.SQLDataType.INTEGER.nullable(false), this, "");

    /**
     * The column <code>avito.shop_category.description</code>.
     */
    public final TableField<ShopCategoryRecord, String> DESCRIPTION = createField("description", org.jooq.impl.SQLDataType.VARCHAR.length(150).nullable(false), this, "");

    /**
     * Create a <code>avito.shop_category</code> table reference
     */
    public ShopCategory() {
        this("shop_category", null);
    }

    /**
     * Create an aliased <code>avito.shop_category</code> table reference
     */
    public ShopCategory(String alias) {
        this(alias, SHOP_CATEGORY);
    }

    private ShopCategory(String alias, Table<ShopCategoryRecord> aliased) {
        this(alias, aliased, null);
    }

    private ShopCategory(String alias, Table<ShopCategoryRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, "");
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Schema getSchema() {
        return Avito.AVITO;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Identity<ShopCategoryRecord, Integer> getIdentity() {
        return Keys.IDENTITY_SHOP_CATEGORY;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UniqueKey<ShopCategoryRecord> getPrimaryKey() {
        return Keys.KEY_SHOP_CATEGORY_PRIMARY;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<UniqueKey<ShopCategoryRecord>> getKeys() {
        return Arrays.<UniqueKey<ShopCategoryRecord>>asList(Keys.KEY_SHOP_CATEGORY_PRIMARY);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ShopCategory as(String alias) {
        return new ShopCategory(alias, this);
    }

    /**
     * Rename this table
     */
    public ShopCategory rename(String name) {
        return new ShopCategory(name, null);
    }
}
